import { Contract } from "cashscript";
import { binToHex, hexToBin, TokenSendRequest } from "mainnet-js";
import SushiArtifact from "../../../artifacts/Sushi.artifact.js";
import SushiBarArtifact from "../../../artifacts/SushiBar.artifact.js";
import xSushiArtifact from "../../../artifacts/xSushi.artifact.js";
import { padVmNumber } from "../../utils.js";
import { WCSigner } from "../../WcSigner.js";
import { MaxSushiBarShares } from "../const.js";
export const consolidateUtxos = async ({ signer, }) => {
    const utxos = await signer.wallet.getUtxos();
    if (utxos.length === 0) {
        throw new Error("No UTXOs available to consolidate.");
    }
    return await signer.send({
        cashaddr: signer.wallet.cashaddr,
        value: 2000,
        unit: "sat",
    }, {
        userPrompt: "Sign to consolidate UTXOs",
    });
};
export const getTokenGenesisUtxo = async ({ signer, }) => {
    const utxos = await signer.wallet.getUtxos();
    const genesisUtxo = utxos.find(utxo => !utxo.token && utxo.vout === 0 && utxo.satoshis >= 2000);
    if (!genesisUtxo) {
        await consolidateUtxos({ signer });
        return getTokenGenesisUtxo({ signer });
    }
    return genesisUtxo;
};
export const deploy = async ({ sushiCategory, wallet, provider, connector, }) => {
    const signer = new WCSigner(wallet, connector);
    if (!sushiCategory) {
        const genesisUtxo = await getTokenGenesisUtxo({ signer });
        const response = await signer.tokenGenesis({
            amount: MaxSushiBarShares,
        }, [], {
            ensureUtxos: [genesisUtxo],
            queryBalance: false,
            userPrompt: "Sign to create Sushi token",
        });
        sushiCategory = response.tokenIds[0];
    }
    let xSushiCategory;
    {
        const genesisUtxo = await getTokenGenesisUtxo({ signer });
        const response = await signer.tokenGenesis({
            amount: MaxSushiBarShares - 1n,
        }, [], {
            ensureUtxos: [genesisUtxo],
            queryBalance: false,
            userPrompt: "Sign to create xSushi token",
        });
        xSushiCategory = response.tokenIds[0];
    }
    let sushiBarCategory;
    {
        const genesisUtxo = await getTokenGenesisUtxo({ signer });
        const response = await signer.tokenGenesis({
            capability: "mutable",
            commitment: binToHex(Uint8Array.from([
                ...padVmNumber(BigInt(1), 8),
                ...padVmNumber(BigInt(1), 8),
            ]))
        }, [], {
            ensureUtxos: [genesisUtxo],
            queryBalance: false,
            userPrompt: "Sign to create SushiBar token",
        });
        sushiBarCategory = response.tokenIds[0];
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
        userPrompt: "Sign to deploy Sushi contract",
    });
    // "deploy" xSushi contract, send entire supply minus 1 atomic unit
    await signer.send(new TokenSendRequest({
        cashaddr: xSushiContract.address,
        tokenId: xSushiCategory,
        amount: MaxSushiBarShares - 1n,
    }), {
        userPrompt: "Sign to deploy xSushi contract",
    });
    // "deploy" SushiBar contract, send NFT
    await signer.send(new TokenSendRequest({
        cashaddr: sushiBarContract.address,
        tokenId: sushiBarCategory,
        capability: "mutable",
        commitment: binToHex(Uint8Array.from([
            ...padVmNumber(BigInt(1), 8),
            ...padVmNumber(BigInt(1), 8),
        ]))
    }), {
        userPrompt: "Sign to deploy SushiBar contract",
    });
    return {
        sushiCategory,
        xSushiCategory,
        sushiBarCategory,
    };
};
//# sourceMappingURL=deploy.js.map