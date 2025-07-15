import { IConnector } from "@bch-wc2/interfaces";
import { NetworkProvider, placeholderP2PKHUnlocker, TransactionBuilder } from "cashscript";
import { BaseWallet, binToHex, TokenSendRequest } from "mainnet-js";
import { getContracts, padVmNumber, toCashScriptUtxo, vmToBigInt } from "../../utils.js";
import { WCSigner } from "../../WcSigner.js";
import { MaxSushiBarShares } from "../const.js";

export const enter = async ({
  amountSushi,
  wallet,
  provider,
  connector,
  sushiCategory,
  xSushiCategory,
  sushiBarCategory,
} : {
  amountSushi: bigint,
  wallet: BaseWallet,
  provider: NetworkProvider,
  connector: IConnector,
  sushiCategory: string,
  xSushiCategory: string,
  sushiBarCategory: string,
}) => {
  return enterOrLeave({
    enter: true,
    amount: amountSushi,
    wallet,
    provider,
    connector,
    sushiCategory,
    xSushiCategory,
    sushiBarCategory,
  });
}

export const leave = async ({
  amountXSushi,
  wallet,
  provider,
  connector,
  sushiCategory,
  xSushiCategory,
  sushiBarCategory,
} : {
  amountXSushi: bigint,
  wallet: BaseWallet,
  provider: NetworkProvider,
  connector: IConnector,
  sushiCategory: string,
  xSushiCategory: string,
  sushiBarCategory: string,
}) => {
  return enterOrLeave({
    enter: false,
    amount: amountXSushi,
    wallet,
    provider,
    connector,
    sushiCategory,
    xSushiCategory,
    sushiBarCategory,
  });
}

export const enterOrLeave = async ({
  enter,
  amount,
  wallet,
  provider,
  connector,
  sushiCategory,
  xSushiCategory,
  sushiBarCategory,
} : {
  enter: boolean,
  amount: bigint,
  wallet: BaseWallet,
  provider: NetworkProvider,
  connector: IConnector,
  sushiCategory: string,
  xSushiCategory: string,
  sushiBarCategory: string,
}) => {
  const signer = new WCSigner(wallet, connector);

  const contracts = getContracts(sushiCategory, xSushiCategory, sushiBarCategory, provider);

  const sushiBarContractUtxo = (await contracts.sushiBar.getUtxos())[0];
  if (!sushiBarContractUtxo || !sushiBarContractUtxo.token?.nft?.commitment) {
    throw new Error("No suitable UTXO found for SushiBar contract");
  }

  const totalSushi = vmToBigInt(sushiBarContractUtxo.token.nft.commitment.slice(0, 16));
  const totalShares = vmToBigInt(sushiBarContractUtxo.token.nft.commitment.slice(16, 32));

  let what: bigint;
  let newCommitment: string;

  let inputTokenCategory: string;
  let outputTokenCategory: string;
  if (enter) {
    inputTokenCategory = sushiCategory;
    outputTokenCategory = xSushiCategory;

    what = totalShares > 0n ? amount * totalShares / totalSushi : amount;

    const newTotalSushi = totalSushi + amount;
    const newTotalShares = totalShares + what;

    newCommitment = binToHex(Uint8Array.from([
      ...padVmNumber(newTotalSushi, 8),
      ...padVmNumber(newTotalShares, 8),
    ]));
  } else {
    inputTokenCategory = xSushiCategory;
    outputTokenCategory = sushiCategory;

    what = amount * totalSushi / totalShares;

    const newTotalSushi = totalSushi - what;
    const newTotalShares = totalShares - amount;

    newCommitment = binToHex(Uint8Array.from([
      ...padVmNumber(newTotalSushi, 8),
      ...padVmNumber(newTotalShares, 8),
    ]));
  }

  const sushiContractUtxo = (await contracts.sushi.getUtxos()).find(utxo => utxo.token!.amount === totalSushi);
  if (!sushiContractUtxo || !sushiContractUtxo.token?.amount) {
    throw new Error("No suitable UTXO found for Sushi contract");
  }

  const xSushiContractUtxo = (await contracts.xSushi.getUtxos()).find(utxo => utxo.token!.amount === MaxSushiBarShares - totalShares);
  if (!xSushiContractUtxo || !xSushiContractUtxo.token?.amount) {
    throw new Error("No suitable UTXO found for xSushi contract");
  }

  const inputTokenUtxoCandidates = await signer.wallet.getUtxos();
  const inputTokenUtxos = inputTokenUtxoCandidates
    .filter(utxo => utxo.token?.tokenId === inputTokenCategory && utxo.token.amount >= 0n);
  const tokenAvailable = inputTokenUtxos
    .reduce((sum, utxo) => sum + utxo.token!.amount, 0n);

  if (tokenAvailable < amount) {
    if (enter) {
      throw new Error(`Not enough Sushi available to enter: ${amount} required, ${tokenAvailable} available`);
    } else {
      throw new Error(`Not enough xSushi available in SushiBar to leave: ${amount} required, ${tokenAvailable} available`); 
    }
  }

  let inputTokenUtxo = inputTokenUtxos.find(utxo => utxo.token!.amount === amount);
  if (!inputTokenUtxo) {
    // consolidate
    await signer.send(new TokenSendRequest({
      cashaddr: signer.wallet.cashaddr,
      tokenId: inputTokenCategory,
      amount: amount,
    }), {
      userPrompt: `Sign to consolidate ${enter ? `Sushi` : `xSushi`} UTXOs`,
    });

    inputTokenUtxo = (await signer.wallet.getUtxos()).find(utxo => utxo.token?.tokenId === inputTokenCategory && utxo.token.amount === amount);

    if (!inputTokenUtxo) {
      throw new Error(`Failed to find a suitable ${enter ? `Sushi` : `xSushi`} UTXO after consolidation`);
    }
  }

  const fundingUtxo = (await signer.wallet.getUtxos()).find(utxo => utxo.satoshis >= 5000 && !utxo.token);
  if (!fundingUtxo) {
    throw new Error("No suitable funding UTXO found for transaction fees");
  };

  const builder = new TransactionBuilder({ provider })
    .addInput(sushiBarContractUtxo, contracts.sushiBar.unlock.enterOrLeave(amount, enter))
    .addInput(sushiContractUtxo, contracts.sushi.unlock.spend())
    .addInput(xSushiContractUtxo, contracts.xSushi.unlock.spend())
    .addInput(toCashScriptUtxo(inputTokenUtxo), placeholderP2PKHUnlocker(signer.wallet.cashaddr))
    .addInput(toCashScriptUtxo(fundingUtxo), placeholderP2PKHUnlocker(signer.wallet.cashaddr))
    .addOutput({to: contracts.sushiBar.tokenAddress, amount: 1000n, token: {
      ...sushiBarContractUtxo.token,
      nft: {
        capability: sushiBarContractUtxo.token.nft.capability,
        commitment: newCommitment,
      },
    }})
    .addOutput({
      to: contracts.sushi.tokenAddress,
      token: {
        ...sushiContractUtxo.token,
        amount: sushiContractUtxo.token.amount + (enter ? amount : -what),
      },
      amount: 1000n,
    })
    .addOutput({
      to: contracts.xSushi.tokenAddress,
      token: {
        ...xSushiContractUtxo.token,
        amount: xSushiContractUtxo.token.amount + (enter ? -what : amount),
      },
      amount: 1000n,
    })
    .addOutput({
      to: signer.wallet.tokenaddr,
      token: {
        category: outputTokenCategory,
        amount: what,
      },
      amount: 1000n,
    });

  const txSize = builder.build().length / 2;
  const change = builder.inputs.reduce((sum, input) => sum + input.satoshis, 0n) -
    builder.outputs.reduce((sum, output) => sum + (output.amount ?? 0n), 0n);

  builder.addOutput({
    to: signer.wallet.cashaddr,
    amount: change - BigInt(txSize) - 100n, // BCH change
  });

  {
    const txSize = builder.build().length / 2;
    const change = builder.inputs.reduce((sum, input) => sum + input.satoshis, 0n) -
      builder.outputs.reduce((sum, output) => sum + (output.amount ?? 0n), 0n);
    console.debug(`Transaction size: ${txSize} bytes, change: ${change} satoshis, fee/byte ${Number(change) / txSize}`);
  }

  await signer.cashscriptSend(builder, {
    userPrompt: `Sign to ${enter ? `enter` : `leave`} SushiBar`,
  });

  return what;
};