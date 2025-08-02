import { IConnector } from "@bch-wc2/interfaces";
import { TransactionBuilder, WcTransactionOptions } from "cashscript";
export declare class CsSigner {
    connector: IConnector;
    constructor(connector: IConnector);
    cashscriptSend(builder: TransactionBuilder, options?: WcTransactionOptions): Promise<import("@bch-wc2/interfaces").WcSignTransactionResponse>;
}
