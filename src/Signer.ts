import { isPlaceholderUnlocker, SignatureTemplate, TransactionBuilder } from "cashscript";
import { hexToBin, WcTransactionOptions, WcSigner } from "mainnet-js";

export class Signer extends WcSigner {
  async cashscriptSend(builder: TransactionBuilder, options?: WcTransactionOptions) {
    if ("privateKey" in this.connector) {
      const signatureTemplate = new SignatureTemplate(this.connector.privateKey as Uint8Array);
      for (const input of builder.inputs) {
        if (isPlaceholderUnlocker(input.unlocker)) {
          input.unlocker = signatureTemplate.unlockP2PKH();
        }
      }
      console.log(builder.bitauthUri());
      builder.debug();
    }

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
