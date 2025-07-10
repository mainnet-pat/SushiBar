import { Wallet, TestNetWallet, UtxoI, binToHex, hexToBin, TokenSendRequest } from "mainnet-js";
import { Contract, NetworkProvider } from "cashscript";
import { padVmNumber } from "../utils";
import SushiArtifact from "../../artifacts/Sushi.artifact.js";
import xSushiArtifact from "../../artifacts/xSushi.artifact.js";
import SushiBarArtifact from "../../artifacts/SushiBar.artifact.js";

export const consolidateUtxos = async ({
  wallet,
} : {
  wallet: Wallet | TestNetWallet,
}) => {
  const utxos = await wallet.getUtxos();

  if (utxos.length === 0) {
    throw new Error("No UTXOs available to consolidate.");
  }

  return await wallet.send({
    cashaddr: wallet.cashaddr,
    value: 2000,
    unit: "sat",
  });
}

export const getTokenGenesisUtxo = async ({
  wallet,
  provider,
} : {
  wallet: Wallet | TestNetWallet,
  provider: NetworkProvider,
}): Promise<UtxoI> => {
  const utxos = await wallet.getUtxos();

  const genesisUtxo = utxos.find(utxo => !utxo.token && utxo.vout === 0 && utxo.satoshis >= 2000);

  if (!genesisUtxo) {
    await consolidateUtxos({ wallet });
    return getTokenGenesisUtxo({ wallet, provider });
  }

  return genesisUtxo;
};

export const deploy = async ({
  sushiCategory,
  wallet,
  provider,
} : {
  sushiCategory?: string,
  wallet: Wallet | TestNetWallet,
  provider: NetworkProvider,
}) => {
  if (!sushiCategory) {
    const genesisUtxo = await getTokenGenesisUtxo({ wallet, provider });
    const response = await wallet.tokenGenesis({
      amount: 100000000000n,
    }, [], {
      ensureUtxos: [genesisUtxo],
      queryBalance: false,
    });

    sushiCategory = response.tokenIds![0]!;
  }

  let xSushiCategory: string;
  {
    const genesisUtxo = await getTokenGenesisUtxo({ wallet, provider });
    const response = await wallet.tokenGenesis({
      amount: 100000000000n,
    }, [], {
      ensureUtxos: [genesisUtxo],
      queryBalance: false,
    });

    xSushiCategory = response.tokenIds![0]!;
  }

  let sushiBarCategory: string;
  {
    const genesisUtxo = await getTokenGenesisUtxo({ wallet, provider });
    const response = await wallet.tokenGenesis({
      capability: "mutable",
      commitment: binToHex(Uint8Array.from([
        ...padVmNumber(BigInt(1), 8),
        ...padVmNumber(BigInt(1), 8),
      ]))
    }, [], {
      ensureUtxos: [genesisUtxo],
      queryBalance: false,
    });

    sushiBarCategory = response.tokenIds![0]!;
  }

  const sushiContract = new Contract(SushiArtifact, [hexToBin(sushiCategory).reverse(), hexToBin(sushiBarCategory).reverse()], { provider, addressType: "p2sh20" });
  const xSushiContract = new Contract(xSushiArtifact, [hexToBin(xSushiCategory).reverse(), hexToBin(sushiBarCategory).reverse()], { provider, addressType: "p2sh20" });
  const sushiBarContract = new Contract(SushiBarArtifact, [hexToBin(sushiBarCategory).reverse(), hexToBin(sushiCategory).reverse(), hexToBin(xSushiCategory).reverse()], { provider, addressType: "p2sh20" });

  // "deploy" Sushi contract, send 1 atomic unit
  await wallet.send(new TokenSendRequest({
    cashaddr: sushiContract.address,
    tokenId: sushiCategory,
    amount: 1n,
  }));

  // "deploy" xSushi contract, send entire supply
  await wallet.send(new TokenSendRequest({
    cashaddr: xSushiContract.address,
    tokenId: xSushiCategory,
    amount: 100000000000n,
  }));

  // "deploy" SushiBar contract, send NFT
  await wallet.send(new TokenSendRequest({
    cashaddr: sushiBarContract.address,
    tokenId: sushiBarCategory,
    capability: "mutable",
    commitment: binToHex(Uint8Array.from([
      ...padVmNumber(BigInt(1), 8),
      ...padVmNumber(BigInt(1), 8),
    ]))
  }));

  return {
    sushiCategory,
    xSushiCategory,
    sushiBarCategory,
  }
}
