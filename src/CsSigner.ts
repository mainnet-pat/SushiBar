import { IConnector } from "@bch-wc2/interfaces";
import { PrimitiveType } from "@cashscript/utils";
import { isContractUnlocker, isPlaceholderUnlocker, SignatureTemplate, TransactionBuilder, WcTransactionOptions } from "cashscript";

export class CsSigner {
  public connector: IConnector;

  constructor(connector: IConnector) {
    if (!connector) {
      throw new Error("Invalid wallet or connector");
    }

    this.connector = connector;
  }

  async cashscriptSend(builder: TransactionBuilder, options?: WcTransactionOptions) {
    if ("privateKey" in this.connector) {
      const signatureTemplate = new SignatureTemplate(this.connector.privateKey as Uint8Array);
      for (const input of builder.inputs) {
        if (isContractUnlocker(input.unlocker)) {
          // replace signature function params
          for (const [index, inputParam] of input.unlocker.abiFunction.inputs.entries()) {
            if (inputParam.type === PrimitiveType.SIG) {
              input.unlocker.params[index] = signatureTemplate;
            }
          }
        } else if (isPlaceholderUnlocker(input.unlocker)) {
          // replace placeholder p2pkh signatures
          input.unlocker = signatureTemplate.unlockP2PKH();
        }
      }
      builder.debug();
    }

    const signRequest = builder.generateWcTransactionObject(options);

    const signResponse = await this.connector.signTransaction(signRequest);
    if (!signResponse) {
      throw new Error("Failed to sign cashscript transaction, user may have rejected the request");
    }

    if (options?.broadcast !== true) {
      await builder.provider.sendRawTransaction(signResponse.signedTransaction);
    }

    return signResponse;
  }
}
