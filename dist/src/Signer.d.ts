import { IConnector } from "@bch-wc2/interfaces";
import { TransactionBuilder, WcTransactionOptions } from "cashscript";
import { BaseWallet, WcSigner } from "mainnet-js";
import { CsSigner } from "./CsSigner.js";
export declare class Signer extends WcSigner {
    protected csSigner: CsSigner;
    constructor(wallet: BaseWallet, connector: IConnector);
    cashscriptSend(builder: TransactionBuilder, options?: WcTransactionOptions): Promise<import("@bch-wc2/interfaces").WcSignTransactionResponse>;
}
