import { IConnector } from "@bch-wc2/interfaces";
import { Contract, NetworkProvider } from "cashscript";
import { BaseWallet, binToHex, hexToBin, Registry, TokenSendRequest } from "mainnet-js";
import SushiArtifact from "../../../artifacts/Sushi.artifact.js";
import SushiBarArtifact from "../../../artifacts/SushiBar.artifact.js";
import xSushiArtifact from "../../../artifacts/xSushi.artifact.js";
import { tokenGenesisWithBcmrPinToIpfs } from "../../ipfsUtils.js";
import { Signer } from "../../Signer.js";
import { getTokenGenesisUtxo, padVmNumber } from "../../utils.js";
import { MaxSushiBarShares, xSushiScale } from "../const.js";

export const deploy = async ({
  sushiCategory,
  wallet,
  provider,
  connector,
  bcmrs,
  tokenNames = {
    sushiName: "Sushi",
    xSushiName: "xSushi",
    sushiBarName: "SushiBar",
  },
} : {
  sushiCategory?: string,
  wallet: BaseWallet,
  provider: NetworkProvider,
  connector: IConnector,
  bcmrs?: {
    sushiBcmr?: Registry,
    xSushiBcmr?: Registry,
    sushiBarBcmr?: Registry,
  },
  tokenNames?: {
    sushiName?: string,
    xSushiName?: string,
    sushiBarName?: string,
  };
}) => {
  const signer = new Signer(wallet, connector);

  if (!sushiCategory) {
    if (!bcmrs?.sushiBcmr) {
      const genesisUtxo = await getTokenGenesisUtxo({ signer });
      const response = await signer.tokenGenesis({
        amount: MaxSushiBarShares,
      }, [], {
        ensureUtxos: [genesisUtxo],
        queryBalance: false,
        userPrompt: `Sign to create ${tokenNames.sushiName ?? 'Sushi'} token`,
      });

      sushiCategory = response.tokenIds![0]!;
    } else {
      const response = await tokenGenesisWithBcmrPinToIpfs({
        signer,
        genesisRequest: {
          amount: MaxSushiBarShares,
        },
        bcmr: bcmrs.sushiBcmr,
        userPrompt: `Sign to create ${tokenNames.sushiBarName ?? 'Sushi'} token`,
      });

      sushiCategory = response.tokenIds![0]!;
    }
  } else {
    // check if signer has the sushi token
    const sushiAmount = await signer.wallet.getTokenBalance(sushiCategory);
    if (!sushiAmount) {
      throw new Error(`No ${tokenNames.sushiName ?? 'Sushi'} tokens found in signer's wallet for category: ${sushiCategory}`);
    }
  }

  let xSushiCategory: string;
  {
    if (!bcmrs?.xSushiBcmr) {
      const genesisUtxo = await getTokenGenesisUtxo({ signer });
      const response = await signer.tokenGenesis({
        amount: MaxSushiBarShares - 1n,
      }, [], {
        ensureUtxos: [genesisUtxo],
        queryBalance: false,
        userPrompt: `Sign to create ${tokenNames.xSushiName ?? 'xSushi'} token`,
      });

      xSushiCategory = response.tokenIds![0]!;
    } else {
      const response = await tokenGenesisWithBcmrPinToIpfs({
        signer,
        genesisRequest: {
          amount: MaxSushiBarShares - 1n,
        },
        bcmr: bcmrs.xSushiBcmr,
        userPrompt: `Sign to create ${tokenNames.xSushiName ?? 'xSushi'} token`,
      });

      xSushiCategory = response.tokenIds![0]!;
    }
  }

  let sushiBarCategory: string;
  {
    if (!bcmrs?.sushiBarBcmr) {
      const genesisUtxo = await getTokenGenesisUtxo({ signer });
      const response = await signer.tokenGenesis({
        capability: "mutable",
        // here we initialize the initial scale factor
        commitment: binToHex(Uint8Array.from([
          ...padVmNumber(1n, 8),
          ...padVmNumber(1n * xSushiScale, 8),
        ])),
      }, [], {
        ensureUtxos: [genesisUtxo],
        queryBalance: false,
        userPrompt: `Sign to create ${tokenNames.sushiBarName ?? 'SushiBar'} token`,
      });

      sushiBarCategory = response.tokenIds![0]!;
    } else {
      const response = await tokenGenesisWithBcmrPinToIpfs({
        signer,
        genesisRequest: {
          capability: "mutable",
          // here we initialize the initial scale factor
          commitment: binToHex(Uint8Array.from([
            ...padVmNumber(1n, 8),
            ...padVmNumber(1n * xSushiScale, 8),
          ])),
        },
        bcmr: bcmrs.sushiBarBcmr,
        userPrompt: `Sign to create ${tokenNames.sushiBarName ?? 'SushiBar'} token`,
      });

      sushiBarCategory = response.tokenIds![0]!;
    }
  }

  const sushiContract = new Contract(SushiArtifact, [hexToBin(sushiCategory).reverse(), hexToBin(sushiBarCategory).reverse()], { provider, addressType: "p2sh20" });
  const xSushiContract = new Contract(xSushiArtifact, [hexToBin(xSushiCategory).reverse(), hexToBin(sushiBarCategory).reverse()], { provider, addressType: "p2sh20" });
  const sushiBarContract = new Contract(SushiBarArtifact, [hexToBin(sushiBarCategory).reverse(), hexToBin(sushiCategory).reverse(), hexToBin(xSushiCategory).reverse()], { provider, addressType: "p2sh20" });

  // "deploy" Sushi contract, send 1 atomic unit
  await signer.send(new TokenSendRequest({
    cashaddr: sushiContract.address,
    tokenId: sushiCategory,
    amount: 1n,
  }), {
    userPrompt: `Sign to deploy ${tokenNames.sushiName ?? 'Sushi'} contract`,
  });

  // "deploy" xSushi contract, send entire supply minus 1 atomic unit
  await signer.send(new TokenSendRequest({
    cashaddr: xSushiContract.address,
    tokenId: xSushiCategory,
    amount: MaxSushiBarShares - 1n * xSushiScale,
  }), {
    checkTokenQuantities: false, // implicitly burn the rest xSushi
    userPrompt: `Sign to deploy ${tokenNames.xSushiName ?? 'xSushi'} contract`,
  });

  // "deploy" SushiBar contract, send NFT
  await signer.send(new TokenSendRequest({
    cashaddr: sushiBarContract.address,
    tokenId: sushiBarCategory,
    capability: "mutable",
    // here we initialize the initial scale factor
    commitment: binToHex(Uint8Array.from([
      ...padVmNumber(1n, 8),
      ...padVmNumber(1n * xSushiScale, 8),
    ])),
  }), {
    userPrompt: `Sign to deploy ${tokenNames.sushiBarName ?? 'SushiBar'} contract`,
  });

  return {
    sushiCategory,
    xSushiCategory,
    sushiBarCategory,
  }
}
