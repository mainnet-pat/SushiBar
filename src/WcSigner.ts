import { IConnector } from "@bch-wc2/interfaces";
import { TransactionBuilder } from "cashscript";
import { BaseWallet, generateWcSignTransactionRequest, hexToBin, OpReturnData, SendRequest, SendRequestArray, SendRequestOptionsI, SendRequestType, SendResponse, TestNetWatchWallet, TokenGenesisRequest, TokenSendRequest, WcTransactionOptions } from "mainnet-js";

export class WCSigner {
  public wallet!: TestNetWatchWallet;
  public connector: IConnector;

  constructor(wallet: BaseWallet, connector: IConnector) {
    if (!wallet || !connector) {
      throw new Error("Invalid wallet or connector");
    }

    this.wallet = wallet;
    this.connector = connector;
  }

  async send(requests:
      | SendRequest
      | TokenSendRequest
      | OpReturnData
      | Array<SendRequest | TokenSendRequest | OpReturnData>
      | SendRequestArray[],
    options?: SendRequestOptionsI & WcTransactionOptions
  ): Promise<SendResponse> {
    const sendResponse = await this.wallet.send(requests, { queryBalance: false, ...options, buildUnsigned: true});

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

  async tokenGenesis(
    genesisRequest: TokenGenesisRequest,
    sendRequests: SendRequestType | SendRequestType[] = [],
    options?: SendRequestOptionsI & WcTransactionOptions
  ): Promise<SendResponse> {
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

  async cashscriptSend(builder: TransactionBuilder, options?: WcTransactionOptions) {
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