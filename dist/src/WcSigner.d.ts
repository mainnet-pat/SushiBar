import { IConnector } from "@bch-wc2/interfaces";
import { TransactionBuilder } from "cashscript";
import { BaseWallet, OpReturnData, SendRequest, SendRequestArray, SendRequestOptionsI, SendRequestType, SendResponse, TestNetWatchWallet, TokenGenesisRequest, TokenSendRequest, WcTransactionOptions } from "mainnet-js";
export declare class WCSigner {
    wallet: TestNetWatchWallet;
    connector: IConnector;
    constructor(wallet: BaseWallet, connector: IConnector);
    send(requests: SendRequest | TokenSendRequest | OpReturnData | Array<SendRequest | TokenSendRequest | OpReturnData> | SendRequestArray[], options?: SendRequestOptionsI & WcTransactionOptions): Promise<SendResponse>;
    tokenGenesis(genesisRequest: TokenGenesisRequest, sendRequests?: SendRequestType | SendRequestType[], options?: SendRequestOptionsI & WcTransactionOptions): Promise<SendResponse>;
    cashscriptSend(builder: TransactionBuilder, options?: WcTransactionOptions): Promise<import("@bch-wc2/interfaces").WcSignTransactionResponse>;
}
