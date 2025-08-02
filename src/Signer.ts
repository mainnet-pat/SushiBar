import { IConnector } from "@bch-wc2/interfaces";
import { TransactionBuilder, WcTransactionOptions } from "cashscript";
import { BaseWallet, WcSigner } from "mainnet-js";
import { CsSigner } from "./CsSigner.js";

export class Signer extends WcSigner {
  protected csSigner: CsSigner;

  constructor(wallet: BaseWallet, connector: IConnector) {
    super(wallet, connector);
    this.csSigner = new CsSigner(connector);
  }

  async cashscriptSend(builder: TransactionBuilder, options?: WcTransactionOptions) {
    return this.csSigner.cashscriptSend(builder, options);
  }
}
