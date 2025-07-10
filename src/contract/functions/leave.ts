import { NetworkProvider, SignatureTemplate, TransactionBuilder, Utxo } from "cashscript";
import { getContracts, padVmNumber, vmToBigInt, toCashScriptUtxo } from "../../utils";
import { binToHex, TestNetWallet, TokenSendRequest } from "mainnet-js";

export const leave = async ({
  amountXSushi,
  wallet,
  provider,
  sushiCategory,
  xSushiCategory,
  sushiBarCategory,
} : {
  amountXSushi: bigint,
  wallet: TestNetWallet,
  provider: NetworkProvider,
  sushiCategory: string,
  xSushiCategory: string,
  sushiBarCategory: string,
}) => {
  const contracts = getContracts(sushiCategory, xSushiCategory, sushiBarCategory, provider);

  const sushiBarContractUtxo = (await contracts.sushiBar.getUtxos())[0];
  if (!sushiBarContractUtxo || !sushiBarContractUtxo.token?.nft?.commitment) {
    throw new Error("No suitable UTXO found for SushiBar contract");
  }

  const totalSushi = vmToBigInt(sushiBarContractUtxo.token.nft.commitment.slice(0, 16));
  const totalShares = vmToBigInt(sushiBarContractUtxo.token.nft.commitment.slice(16, 32));

  const what = amountXSushi * totalSushi / totalShares;

  const newTotalSushi = totalSushi - what;
  const newTotalShares = totalShares - amountXSushi;

  const newCommitment = binToHex(Uint8Array.from([
    ...padVmNumber(newTotalSushi, 8),
    ...padVmNumber(newTotalShares, 8),
  ]));

  const sushiContractUtxo = (await contracts.sushi.getUtxos())[0];
  if (!sushiContractUtxo || !sushiContractUtxo.token?.amount) {
    throw new Error("No suitable UTXO found for Sushi contract");
  }

  if (sushiContractUtxo.token.amount - what <= 0n) {
    throw new Error(`Not enough Sushi available in SushiBar to leave: ${what} required, ${sushiContractUtxo.token.amount} available`);
  }

  const xSushiContractUtxo = (await contracts.xSushi.getUtxos())[0];
  if (!xSushiContractUtxo || !xSushiContractUtxo.token?.amount) {
    throw new Error("No suitable UTXO found for xSushi contract");
  }

  const xSushiDepositUtxoCandidates = await wallet.getUtxos();
  const xSushiDepositUtxos = xSushiDepositUtxoCandidates
    .filter(utxo => utxo.token?.tokenId === xSushiCategory && utxo.token.amount >= 0n);
  const xSushiAvailable = xSushiDepositUtxos
    .reduce((sum, utxo) => sum + utxo.token!.amount, 0n);

  if (xSushiAvailable < amountXSushi) {
    throw new Error(`Not enough xSushi available to enter: ${amountXSushi} required, ${xSushiAvailable} available`);
  }

  let xSushiDepositUtxo = xSushiDepositUtxos.find(utxo => utxo.token!.amount === amountXSushi);
  if (!xSushiDepositUtxo) {
    // consolidate
    await wallet.send(new TokenSendRequest({
      cashaddr: wallet.cashaddr,
      tokenId: xSushiCategory,
      amount: amountXSushi,
    }), {
      queryBalance: false,
    });

    xSushiDepositUtxo = (await wallet.getUtxos()).find(utxo => utxo.token?.tokenId === xSushiCategory && utxo.token.amount === amountXSushi);

    if (!xSushiDepositUtxo) {
      throw new Error(`Failed to find a suitable xSushi UTXO after consolidation`);
    }
  }

  const fundingUtxos = (await wallet.getUtxos()).find(utxo => utxo.satoshis >= 5000 && !utxo.token);
  if (!fundingUtxos) {
    throw new Error("No suitable funding UTXO found for transaction fees");
  }

  const signatureTemplate = new SignatureTemplate(wallet.privateKey);

  const builder = new TransactionBuilder({ provider })
    .addInput(sushiBarContractUtxo, contracts.sushiBar.unlock.leave(amountXSushi))
    .addInput(sushiContractUtxo, contracts.sushi.unlock.spend())
    .addInput(xSushiContractUtxo, contracts.xSushi.unlock.spend())
    .addInput(toCashScriptUtxo(xSushiDepositUtxo), signatureTemplate.unlockP2PKH())
    .addInput(toCashScriptUtxo(fundingUtxos), signatureTemplate.unlockP2PKH())
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
        amount: sushiContractUtxo.token.amount - what,
      },
      amount: 1000n,
    })
    .addOutput({
      to: contracts.xSushi.tokenAddress,
      token: {
        ...xSushiContractUtxo.token,
        amount: xSushiContractUtxo.token.amount + amountXSushi,
      },
      amount: 1000n,
    })
    .addOutput({
      to: wallet.tokenaddr,
      token: {
        category: sushiCategory,
        amount: what,
      },
      amount: 1000n,
    });

  const txSize = builder.build().length / 2;
  const change = builder.inputs.reduce((sum, input) => sum + input.satoshis, 0n) -
    builder.outputs.reduce((sum, output) => sum + (output.amount ?? 0n), 0n);

  builder.addOutput({
    to: wallet.cashaddr,
    amount: change - BigInt(txSize) - 100n, // BCH change
  });

  {
    const txSize = builder.build().length / 2;
    const change = builder.inputs.reduce((sum, input) => sum + input.satoshis, 0n) -
      builder.outputs.reduce((sum, output) => sum + (output.amount ?? 0n), 0n);
    console.debug(`Transaction size: ${txSize} bytes, change: ${change} satoshis, fee/byte ${Number(change) / txSize}`);
  }

  await builder.send();

  return what;
};