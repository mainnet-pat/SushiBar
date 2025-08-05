import { IConnector } from "@bch-wc2/interfaces";
import { NetworkProvider, placeholderP2PKHUnlocker, TransactionBuilder, Utxo } from "cashscript";
import { BaseWallet, binToHex, TokenSendRequest } from "mainnet-js";
import { Signer } from "../../Signer.js";
import { getContracts, padVmNumber, toCashScriptUtxo, vmToBigInt } from "../../utils.js";
import { MaxSushiBarShares } from "../const.js";

export const incentivizeOrMerge = async ({
  amount,
  inputTokenCategory,
  mergeUtxo,
  wallet,
  provider,
  connector,
  sushiCategory,
  xSushiCategory,
  sushiBarCategory,
} : {
  amount: bigint,
  inputTokenCategory: string,
  mergeUtxo?: Utxo,
  wallet: BaseWallet,
  provider: NetworkProvider,
  connector: IConnector,
  sushiCategory: string,
  xSushiCategory: string,
  sushiBarCategory: string,
}) => {
  if (amount <= 0n) {
    throw new Error("Amount must be greater than 0");
  }

  const signer = new Signer(wallet, connector);

  if (inputTokenCategory !== sushiCategory && inputTokenCategory !== xSushiCategory) {
    throw new Error(`Invalid input token category: ${inputTokenCategory}. Must be either Sushi or xSushi.`);
  }

  const contracts = getContracts(sushiCategory, xSushiCategory, sushiBarCategory, provider);

  const sushiBarContractUtxo = (await contracts.sushiBar.getUtxos())[0];
  if (!sushiBarContractUtxo || !sushiBarContractUtxo.token?.nft?.commitment) {
    throw new Error("No suitable UTXO found for SushiBar contract");
  }

  const totalSushi = vmToBigInt(sushiBarContractUtxo.token.nft.commitment.slice(0, 16));
  const totalShares = vmToBigInt(sushiBarContractUtxo.token.nft.commitment.slice(16, 32));

  const depositSushi = inputTokenCategory === sushiCategory ? amount : 0n;
  const depositXSushi = inputTokenCategory === xSushiCategory ? amount : 0n;

  const newTotalSushi = totalSushi + depositSushi;
  const newTotalShares = totalShares + depositXSushi;

  const newCommitment = binToHex(Uint8Array.from([
    ...padVmNumber(newTotalSushi, 8),
    ...padVmNumber(newTotalShares, 8),
  ]));

  let inputContract = inputTokenCategory === sushiCategory ? contracts.sushi : contracts.xSushi;
  let inputContractUtxo: Utxo;

  if (inputTokenCategory === sushiCategory) {
    const sushiContractUtxo = (await contracts.sushi.getUtxos()).find(utxo => utxo.token!.amount === totalSushi);
    if (!sushiContractUtxo || !sushiContractUtxo.token?.amount) {
      throw new Error("No suitable UTXO found for Sushi contract");
    }

    inputContractUtxo = sushiContractUtxo;
  } else {
    const xSushiContractUtxo = (await contracts.xSushi.getUtxos()).find(utxo => utxo.token!.amount === MaxSushiBarShares - totalShares);
    if (!xSushiContractUtxo || !xSushiContractUtxo.token?.amount) {
      throw new Error("No suitable UTXO found for xSushi contract");
    }

    inputContractUtxo = xSushiContractUtxo;
  }

  let inputUtxo: Utxo;

  if (mergeUtxo) {
    inputUtxo = mergeUtxo;
  } else {
    const sushiDepositUtxoCandidates = await signer.wallet.getUtxos();
    const sushiDepositUtxos = sushiDepositUtxoCandidates
      .filter(utxo => utxo.token?.tokenId === sushiCategory && utxo.token.amount >= 0n);
    const sushiAvailable = sushiDepositUtxos
      .reduce((sum, utxo) => sum + utxo.token!.amount, 0n);

    if (sushiAvailable < amount) {
      throw new Error(`Not enough Sushi available to enter: ${amount} required, ${sushiAvailable} available`);
    }

    let sushiDepositUtxo = sushiDepositUtxos.find(utxo => utxo.token!.amount === amount);
    if (!sushiDepositUtxo) {
      // consolidate
      await signer.send(new TokenSendRequest({
        cashaddr: signer.wallet.cashaddr,
        tokenId: sushiCategory,
        amount: amount,
      }), {
        userPrompt: "Sign the transaction to consolidate Sushi UTXOs",
      });

      sushiDepositUtxo = (await signer.wallet.getUtxos()).find(utxo => utxo.token?.tokenId === sushiCategory && utxo.token.amount === amount);

      if (!sushiDepositUtxo) {
        throw new Error(`Failed to find a suitable Sushi UTXO after consolidation`);
      }
    }

    inputUtxo = toCashScriptUtxo(sushiDepositUtxo);
  }

  const fundingUtxos = (await signer.wallet.getUtxos()).find(utxo => utxo.satoshis >= 5000 && !utxo.token);
  if (!fundingUtxos) {
    throw new Error("No suitable funding UTXO found for transaction fees");
  }

  const builder = new TransactionBuilder({ provider })
    .addInput(sushiBarContractUtxo, contracts.sushiBar.unlock.incentivizeOrMerge(amount))
    .addInput(inputContractUtxo, inputContract.unlock.merge())
    .addInput(inputUtxo, mergeUtxo ? inputContract.unlock.merge() : placeholderP2PKHUnlocker(signer.wallet.cashaddr))
    .addInput(toCashScriptUtxo(fundingUtxos), placeholderP2PKHUnlocker(signer.wallet.cashaddr))
    .addOutput({to: contracts.sushiBar.tokenAddress, amount: 1000n, token: {
      ...sushiBarContractUtxo.token,
      nft: {
        capability: sushiBarContractUtxo.token.nft.capability,
        commitment: newCommitment,
      },
    }})
    .addOutput({
      to: inputContract.tokenAddress,
      token: {
        ...inputContractUtxo.token!,
        amount: inputContractUtxo.token!.amount + amount,
      },
      amount: 1000n,
    });

  const txSize = builder.build().length / 2;
  const change = builder.inputs.reduce((sum, input) => sum + input.satoshis, 0n) -
    builder.outputs.reduce((sum, output) => sum + (output.amount ?? 0n), 0n);

  builder.addOutput({
    to: signer.wallet.cashaddr,
    amount: change - BigInt(txSize) - 250n, // BCH change
  });

  {
    const txSize = builder.build().length / 2;
    const change = builder.inputs.reduce((sum, input) => sum + input.satoshis, 0n) -
      builder.outputs.reduce((sum, output) => sum + (output.amount ?? 0n), 0n);
    console.debug(`Transaction size: ${txSize} bytes, change: ${change} satoshis, fee/byte ${Number(change) / txSize}`);
  }

  await signer.cashscriptSend(builder, {
    userPrompt: `Sign the transaction to ${mergeUtxo ? "merge" : "incentivize"} SushiBar`,
  });

  return amount;
};
