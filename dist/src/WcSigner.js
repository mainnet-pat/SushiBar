import { generateWcSignTransactionRequest, hexToBin } from "mainnet-js";
export class WCSigner {
    wallet;
    connector;
    constructor(wallet, connector) {
        if (!wallet || !connector) {
            throw new Error("Invalid wallet or connector");
        }
        this.wallet = wallet;
        this.connector = connector;
    }
    async send(requests, options) {
        const sendResponse = await this.wallet.send(requests, { queryBalance: false, ...options, buildUnsigned: true });
        const signRequest = generateWcSignTransactionRequest(sendResponse, options);
        const signResponse = await this.connector.signTransaction(signRequest);
        if (!signResponse) {
            throw new Error("Failed to sign transaction, user may have rejected the request");
        }
        if (options?.broadcast !== false) {
            await this.wallet.submitTransaction(hexToBin(signResponse.signedTransaction));
        }
        return sendResponse;
    }
    async tokenGenesis(genesisRequest, sendRequests = [], options) {
        const tokenGenesisResponse = await this.wallet.tokenGenesis(genesisRequest, sendRequests, { queryBalance: false, ...options, buildUnsigned: true });
        const signRequest = generateWcSignTransactionRequest(tokenGenesisResponse, options);
        const signResponse = await this.connector.signTransaction(signRequest);
        if (!signResponse) {
            throw new Error("Failed to sign token genesis transaction, user may have rejected the request");
        }
        if (options?.broadcast !== true) {
            await this.wallet.submitTransaction(hexToBin(signResponse.signedTransaction));
        }
        return tokenGenesisResponse;
    }
    async cashscriptSend(builder, options) {
        const signRequest = builder.generateWcTransactionObject(options);
        const signResponse = await this.connector.signTransaction(signRequest);
        if (!signResponse) {
            throw new Error("Failed to sign cashscript transaction, user may have rejected the request");
        }
        if (options?.broadcast !== true) {
            await this.wallet.submitTransaction(hexToBin(signResponse.signedTransaction));
        }
        return signResponse;
    }
}
//# sourceMappingURL=WcSigner.js.map