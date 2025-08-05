import { IConnector } from "@bch-wc2/interfaces";
import { NetworkProvider, placeholderP2PKHUnlocker, TransactionBuilder } from "cashscript";
import { BaseWallet, binToHex, TokenSendRequest } from "mainnet-js";
import { Signer } from "../../Signer.js";
import { getContracts, padVmNumber, toCashScriptUtxo, vmToBigInt } from "../../utils.js";
import { MaxSushiBarShares, xSushiScale } from "../const.js";

export const enter = async ({
  amountSushi,
  wallet,
  provider,
  connector,
  sushiCategory,
  xSushiCategory,
  sushiBarCategory,
  tokenNames = {
    sushiName: "Sushi",
    xSushiName: "xSushi",
    sushiBarName: "SushiBar",
  },
} : {
  amountSushi: bigint,
  wallet: BaseWallet,
  provider: NetworkProvider,
  connector: IConnector,
  sushiCategory: string,
  xSushiCategory: string,
  sushiBarCategory: string,
  tokenNames?: {
    sushiName?: string,
    xSushiName?: string,
    sushiBarName?: string,
  };
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
    tokenNames,
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
  tokenNames = {
    sushiName: "Sushi",
    xSushiName: "xSushi",
    sushiBarName: "SushiBar",
  },
} : {
  amountXSushi: bigint,
  wallet: BaseWallet,
  provider: NetworkProvider,
  connector: IConnector,
  sushiCategory: string,
  xSushiCategory: string,
  sushiBarCategory: string,
  tokenNames?: {
    sushiName?: string,
    xSushiName?: string,
    sushiBarName?: string,
  };
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
    tokenNames,
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
  tokenNames = {
    sushiName: "Sushi",
    xSushiName: "xSushi",
    sushiBarName: "SushiBar",
  },
} : {
  enter: boolean,
  amount: bigint,
  wallet: BaseWallet,
  provider: NetworkProvider,
  connector: IConnector,
  sushiCategory: string,
  xSushiCategory: string,
  sushiBarCategory: string,
  tokenNames?: {
    sushiName?: string,
    xSushiName?: string,
    sushiBarName?: string,
  };
}) => {
  if (amount <= 0n) {
    throw new Error("Amount must be greater than 0");
  }

  const signer = new Signer(wallet, connector);

  const contracts = getContracts(sushiCategory, xSushiCategory, sushiBarCategory, provider);

  const sushiBarContractUtxo = (await contracts.sushiBar.getUtxos())[0];
  if (!sushiBarContractUtxo || !sushiBarContractUtxo.token?.nft?.commitment) {
    throw new Error(`No suitable UTXO found for ${tokenNames.sushiBarName ?? 'SushiBar'} contract`);
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

    what = amount * totalShares / totalSushi;

    if (totalShares <= 1n * xSushiScale) {
      what = xSushiScale * amount; // if this is the first deposit, we just release the same amount of xSushi as Sushi
    }

    const newTotalSushi = totalSushi + amount;
    const newTotalShares = totalShares + what;

    newCommitment = binToHex(Uint8Array.from([
      ...padVmNumber(newTotalSushi, 8),
      ...padVmNumber(newTotalShares, 8),
    ]));
  } else {
    inputTokenCategory = xSushiCategory;
    outputTokenCategory = sushiCategory;

    what = xSushiScale * amount * totalSushi / totalShares / xSushiScale;

    const newTotalSushi = totalSushi - what;
    const newTotalShares = totalShares - amount;

    newCommitment = binToHex(Uint8Array.from([
      ...padVmNumber(newTotalSushi, 8),
      ...padVmNumber(newTotalShares, 8),
    ]));
  }

  if (what === 0n) {
    throw new Error(`Input amount is too small to ${enter ? `enter` : `leave`} ${tokenNames.sushiBarName ?? 'SushiBar'}`);
  }

  const sushiContractUtxo = (await contracts.sushi.getUtxos()).find(utxo => utxo.token!.amount === totalSushi);
  if (!sushiContractUtxo || !sushiContractUtxo.token?.amount) {
    throw new Error(`No suitable UTXO found for ${tokenNames.sushiName ?? 'Sushi'} contract`);
  }

  const xSushiContractUtxo = (await contracts.xSushi.getUtxos()).find(utxo => utxo.token!.amount === MaxSushiBarShares - totalShares);
  if (!xSushiContractUtxo || !xSushiContractUtxo.token?.amount) {
    throw new Error(`No suitable UTXO found for ${tokenNames.xSushiName ?? 'xSushi'} contract`);
  }

  const inputTokenUtxoCandidates = await signer.wallet.getUtxos();
  const inputTokenUtxos = inputTokenUtxoCandidates
    .filter(utxo => utxo.token?.tokenId === inputTokenCategory && utxo.token.amount >= 0n);
  const tokenAvailable = inputTokenUtxos
    .reduce((sum, utxo) => sum + utxo.token!.amount, 0n);

  if (tokenAvailable < amount) {
    if (enter) {
      throw new Error(`Not enough ${tokenNames.sushiName ?? 'Sushi'} available to enter: ${amount} required, ${tokenAvailable} available`);
    } else {
      throw new Error(`Not enough ${tokenNames.xSushiName ?? 'xSushi'} available in ${tokenNames.sushiBarName ?? 'SushiBar'} to leave: ${amount} required, ${tokenAvailable} available`); 
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
      userPrompt: `Sign to consolidate ${enter ? `${tokenNames.sushiName ?? 'Sushi'}` : `${tokenNames.xSushiName ?? 'xSushi'}`} UTXOs`,
    });

    inputTokenUtxo = (await signer.wallet.getUtxos()).find(utxo => utxo.token?.tokenId === inputTokenCategory && utxo.token.amount === amount);

    if (!inputTokenUtxo) {
      throw new Error(`Failed to find a suitable ${enter ? `${tokenNames.sushiName ?? 'Sushi'}` : `${tokenNames.xSushiName ?? 'xSushi'}`} UTXO after consolidation`);
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
    amount: change - BigInt(txSize) - 250n, // BCH change
  });

  {
    const txSize = builder.build().length / 2;
    const change = builder.inputs.reduce((sum, input) => sum + input.satoshis, 0n) -
      builder.outputs.reduce((sum, output) => sum + (output.amount ?? 0n), 0n);
    console.debug(`Transaction size: ${txSize} bytes, change: ${change} satoshis, fee/byte ${Number(change) / txSize}`);
  }

  await signer.cashscriptSend(builder, {
    userPrompt: `Sign to ${enter ? `enter` : `leave`} ${tokenNames.sushiBarName ?? 'SushiBar'}`,
  });

  return what;
};
