import { bigIntToVmNumber, cashAddressToLockingBytecode, decodeCashAddress, encodeCashAddress, hexToBin, padMinimallyEncodedVmNumber, vmNumberToBigInt } from "@bitauth/libauth";
import { Contract } from "cashscript";
import SushiArtifact from "../artifacts/Sushi.artifact.js";
import SushiBarArtifact from "../artifacts/SushiBar.artifact.js";
import xSushiArtifact from "../artifacts/xSushi.artifact.js";
export const min = (...args) => args.reduce((m, e) => e < m ? e : m);
export const require = (predicate, message) => {
    if (!predicate) {
        throw new Error(message);
    }
};
export const padVmNumber = (num, length) => {
    return padMinimallyEncodedVmNumber(bigIntToVmNumber(num), length).slice(0, length);
};
export const vmToBigInt = (vmNumber) => {
    return vmNumberToBigInt(hexToBin(vmNumber), { requireMinimalEncoding: false });
};
export function addressToLockScript(address) {
    const result = cashAddressToLockingBytecode(address);
    if (typeof result === 'string')
        throw new Error(result);
    return result.bytecode;
}
export const toCashAddress = (address) => {
    const decoded = decodeCashAddress(address);
    if (typeof decoded === 'string') {
        throw new Error(decoded);
    }
    return encodeCashAddress({
        ...decoded,
        prefix: address.split(':')[0],
        type: decoded.type.replace('WithTokens', ''),
    }).address;
};
export const toTokenAddress = (address) => {
    const decoded = decodeCashAddress(address);
    if (typeof decoded === 'string') {
        throw new Error(decoded);
    }
    return encodeCashAddress({
        ...decoded,
        prefix: decoded.prefix,
        type: decoded.type.replace('WithTokens', '') + 'WithTokens',
    }).address;
};
export const getSushiContract = (sushiCategory, sushiBarCategory, provider) => {
    return new Contract(SushiArtifact, [hexToBin(sushiCategory).reverse(), hexToBin(sushiBarCategory).reverse()], { provider, addressType: "p2sh20" });
};
export const getXSushiContractContract = (xSushiCategory, sushiBarCategory, provider) => {
    return new Contract(xSushiArtifact, [hexToBin(xSushiCategory).reverse(), hexToBin(sushiBarCategory).reverse()], { provider, addressType: "p2sh20" });
};
export const getSushiBarContract = (sushiCategory, xSushiCategory, sushiBarCategory, provider) => {
    return new Contract(SushiBarArtifact, [hexToBin(sushiBarCategory).reverse(), hexToBin(sushiCategory).reverse(), hexToBin(xSushiCategory).reverse()], { provider, addressType: "p2sh20" });
};
export const getContracts = (sushiCategory, xSushiCategory, sushiBarCategory, provider) => {
    return {
        sushi: getSushiContract(sushiCategory, sushiBarCategory, provider),
        xSushi: getXSushiContractContract(xSushiCategory, sushiBarCategory, provider),
        sushiBar: getSushiBarContract(sushiCategory, xSushiCategory, sushiBarCategory, provider),
    };
};
export const toCashScriptUtxo = (utxo) => ({
    satoshis: BigInt(utxo.satoshis),
    txid: utxo.txid,
    vout: utxo.vout,
    token: utxo.token
        ? {
            amount: utxo.token?.amount ? BigInt(utxo.token.amount) : 0n,
            category: utxo.token?.tokenId,
            nft: utxo.token?.capability || utxo.token?.commitment
                ? {
                    capability: utxo.token?.capability,
                    commitment: utxo.token?.commitment,
                }
                : undefined,
        }
        : undefined,
});
export const consolidateUtxos = async ({ signer, minSatoshis, }) => {
    if (!minSatoshis) {
        return signer.sendMax(signer.wallet.cashaddr, {
            userPrompt: "Sign to consolidate UTXOs",
            queryBalance: false,
        });
    }
    ;
    return signer.send({
        cashaddr: signer.wallet.cashaddr,
        value: minSatoshis,
        unit: "sat",
    }, {
        userPrompt: "Sign to consolidate UTXOs",
        queryBalance: false,
    });
};
export const getTokenGenesisUtxo = async ({ signer, }) => {
    const utxos = await signer.wallet.getUtxos();
    const genesisUtxo = utxos.find(utxo => !utxo.token && utxo.vout === 0 && utxo.satoshis >= 2000);
    if (!genesisUtxo) {
        await consolidateUtxos({ signer, minSatoshis: 2000 });
        return getTokenGenesisUtxo({ signer });
    }
    return genesisUtxo;
};
//# sourceMappingURL=utils.js.map