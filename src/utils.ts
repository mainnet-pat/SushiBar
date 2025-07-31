import { bigIntToVmNumber, CashAddressNetworkPrefix, cashAddressToLockingBytecode, CashAddressType, decodeCashAddress, encodeCashAddress, hexToBin, padMinimallyEncodedVmNumber, vmNumberToBigInt } from "@bitauth/libauth";
import { Contract, NetworkProvider, TokenDetails, Utxo } from "cashscript";
import { UtxoI } from "mainnet-js";
import SushiArtifact from "../artifacts/Sushi.artifact.js";
import SushiBarArtifact from "../artifacts/SushiBar.artifact.js";
import xSushiArtifact from "../artifacts/xSushi.artifact.js";
import { Signer } from "./Signer.js";

export const min = (...args: bigint[]) => args.reduce((m, e) => e < m ? e : m);
export const require = (predicate: boolean, message: string) => {
  if (!predicate) {
    throw new Error(message);
  }
}

export const padVmNumber = (num: bigint, length: number) => {
  return padMinimallyEncodedVmNumber(bigIntToVmNumber(num), length).slice(0, length);
}

export const vmToBigInt = (vmNumber: string) => {
  return vmNumberToBigInt(hexToBin(vmNumber), { requireMinimalEncoding: false }) as bigint;
}

export function addressToLockScript(address: string): Uint8Array {
  const result = cashAddressToLockingBytecode(address);
  if (typeof result === 'string') throw new Error(result);

  return result.bytecode;
}

export const toCashAddress = (address: string) => {
  const decoded = decodeCashAddress(address);
  if (typeof decoded === 'string') {
    throw new Error(decoded);
  }

  return encodeCashAddress({
    ...decoded,
    prefix: address.split(':')[0] as CashAddressNetworkPrefix,
    type: decoded.type.replace('WithTokens', '') as CashAddressType,
  }).address;
}

export const toTokenAddress = (address: string) => {
  const decoded = decodeCashAddress(address);
  if (typeof decoded === 'string') {
    throw new Error(decoded);
  }

  return encodeCashAddress({
    ...decoded,
    prefix: decoded.prefix,
    type: decoded.type.replace('WithTokens', '') + 'WithTokens' as CashAddressType,
  }).address;
}

export const getSushiContract = (sushiCategory: string, sushiBarCategory: string, provider: NetworkProvider) => {
  return new Contract(SushiArtifact, [hexToBin(sushiCategory).reverse(), hexToBin(sushiBarCategory).reverse()], { provider, addressType: "p2sh20" });
};
export const getXSushiContractContract = (xSushiCategory: string, sushiBarCategory: string, provider: NetworkProvider) => {
  return new Contract(xSushiArtifact, [hexToBin(xSushiCategory).reverse(), hexToBin(sushiBarCategory).reverse()], { provider, addressType: "p2sh20" });
};
export const getSushiBarContract = (sushiCategory: string, xSushiCategory: string, sushiBarCategory: string, provider: NetworkProvider) => {
  return new Contract(SushiBarArtifact, [hexToBin(sushiBarCategory).reverse(), hexToBin(sushiCategory).reverse(), hexToBin(xSushiCategory).reverse()], { provider, addressType: "p2sh20" });
};

export const getContracts = (sushiCategory: string, xSushiCategory: string, sushiBarCategory: string, provider: NetworkProvider) => {
  return {
    sushi: getSushiContract(sushiCategory, sushiBarCategory, provider),
    xSushi: getXSushiContractContract(xSushiCategory, sushiBarCategory, provider),
    sushiBar: getSushiBarContract(sushiCategory, xSushiCategory, sushiBarCategory, provider),
  };
};

export const toCashScriptUtxo = (utxo: UtxoI) =>
  ({
    satoshis: BigInt(utxo.satoshis),
    txid: utxo.txid,
    vout: utxo.vout,
    token: utxo.token
      ? ({
          amount: utxo.token?.amount ? BigInt(utxo.token.amount) : 0n,
          category: utxo.token?.tokenId,
          nft:
            utxo.token?.capability || utxo.token?.commitment
              ? ({
                  capability: utxo.token?.capability,
                  commitment: utxo.token?.commitment,
                } as TokenDetails["nft"])
              : undefined,
        } as TokenDetails)
      : undefined,
  } as Utxo);

export const consolidateUtxos = async ({
  signer,
  minSatoshis,
} : {
  signer: Signer,
  minSatoshis?: number,
}) => {
  if (!minSatoshis) {
    return signer.sendMax(signer.wallet.cashaddr, {
      userPrompt: "Sign to consolidate UTXOs",
      queryBalance: false,
    });
  };

  return signer.send({
    cashaddr: signer.wallet.cashaddr,
    value: minSatoshis,
    unit: "sat",
  }, {
    userPrompt: "Sign to consolidate UTXOs",
    queryBalance: false,
  });
}

export const getTokenGenesisUtxo = async ({
  signer,
} : {
  signer: Signer,
}): Promise<UtxoI> => {
  const utxos = await signer.wallet.getUtxos();

  const genesisUtxo = utxos.find(utxo => !utxo.token && utxo.vout === 0 && utxo.satoshis >= 2000);

  if (!genesisUtxo) {
    await consolidateUtxos({ signer, minSatoshis: 2000 });
    return getTokenGenesisUtxo({ signer });
  }

  return genesisUtxo;
};
