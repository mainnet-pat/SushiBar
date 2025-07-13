// Wallet Connect interfaces according to the spec
// see https://github.com/mainnet-pat/wc2-bch-bcr

import { binToHex, CompilationContextBCH, decodeTransaction, encodeLockingBytecodeP2pkh, encodeTransaction, generateSigningSerializationBCH, generateTransaction, hash160, hash256, hexToBin, importWalletTemplate, Input, Output, secp256k1, SigningSerializationFlag, TransactionCommon, TransactionTemplate, walletTemplateP2pkhNonHd, walletTemplateToCompilerBCH } from "@bitauth/libauth";
import { SendResponse, NetworkProvider } from "mainnet-js";
import { WcTransactionObject, WcTransactionOptions } from "./interfaces";

export const generateWcTransactionObject = (sendResponse: SendResponse, options?: WcTransactionOptions): WcTransactionObject => {
  if (!sendResponse.unsignedTransaction || !sendResponse.sourceOutputs) {
    throw new Error("SendResponse does not contain an unsigned transaction or source outputs");
  }

  return { ...options, transaction: sendResponse.unsignedTransaction, sourceOutputs: sendResponse.sourceOutputs };
}

export const signWcTransactionObject = (wcTransactionObject: WcTransactionObject,
  signingInfo: { privateKey: Uint8Array, pubkeyCompressed?: Uint8Array, walletLockingBytecodeHex?: string },
): Uint8Array => {
  const { transaction: wcTransactionItem, sourceOutputs } = wcTransactionObject;
  const { privateKey } = signingInfo;
  const pubkeyCompressed = signingInfo.pubkeyCompressed ?? secp256k1.derivePublicKeyCompressed(privateKey) as Uint8Array;
  const walletLockingBytecodeHex = signingInfo.walletLockingBytecodeHex ?? encodeLockingBytecodeP2pkh(hash160(pubkeyCompressed));

  // prepare libauth template for input signing
  const walletTemplate = importWalletTemplate(walletTemplateP2pkhNonHd);
  if (typeof walletTemplate === "string") throw new Error("Transaction template error");

  const unsignedTransaction = typeof wcTransactionItem === "string" ? decodeTransaction(hexToBin(wcTransactionItem)) : wcTransactionItem;
  // If unsignedTransaction is still a string that means decodeTransaction failed
  if(typeof unsignedTransaction == "string") {
    throw new Error("Transaction template error: " + unsignedTransaction);
  }

  // configure compiler
  const compiler = walletTemplateToCompilerBCH(walletTemplate);

  // A Transaction representation that may use compilation directives in place of lockingBytecode and unlockingBytecode instances
  const txTemplate = {...unsignedTransaction} as TransactionTemplate<typeof compiler>;

  for (const [index, input] of txTemplate.inputs.entries()) {
    const correspondingSourceOutput = sourceOutputs[index] as (typeof sourceOutputs)[number];

    if (correspondingSourceOutput.contract?.artifact.contractName) {
      // instruct compiler to produce signatures for relevant contract inputs

      // replace pubkey and sig placeholders
      let unlockingBytecodeHex = binToHex(correspondingSourceOutput.unlockingBytecode);
      const sigPlaceholder = "41" + binToHex(Uint8Array.from(Array(65)));
      const pubkeyPlaceholder = "21" + binToHex(Uint8Array.from(Array(33)));
      if (unlockingBytecodeHex.indexOf(sigPlaceholder) !== -1) {
        // compute the signature argument
        const hashType = SigningSerializationFlag.allOutputs | SigningSerializationFlag.utxos | SigningSerializationFlag.forkId;
        const context: CompilationContextBCH = { inputIndex: index, sourceOutputs, transaction: unsignedTransaction };
        const signingSerializationType = new Uint8Array([hashType]);

        const coveredBytecode = correspondingSourceOutput.contract?.redeemScript;
        if (!coveredBytecode) {
          throw new Error("Not enough information provided, please include contract redeemScript");
        }
        const sighashPreimage = generateSigningSerializationBCH(context, { coveredBytecode, signingSerializationType });
        const sighash = hash256(sighashPreimage);
        const signature = secp256k1.signMessageHashSchnorr(privateKey, sighash);
        if (typeof signature === "string") {
          throw new Error("Signature error: " + signature);
        }
        const sig = Uint8Array.from([...signature, hashType]);

        unlockingBytecodeHex = unlockingBytecodeHex.replace(sigPlaceholder, "41" + binToHex(sig));
      }
      if (unlockingBytecodeHex.indexOf(pubkeyPlaceholder) !== -1) {
        unlockingBytecodeHex = unlockingBytecodeHex.replace(pubkeyPlaceholder, "21" + binToHex(pubkeyCompressed));
      }

      input.unlockingBytecode = hexToBin(unlockingBytecodeHex);
    } else {
      // replace unlocking bytecode for placeholder unlockers matching the wallet locking bytecode
      const inputLockingBytecodeHex = binToHex(correspondingSourceOutput.lockingBytecode);
      if (!correspondingSourceOutput.unlockingBytecode?.length &&
        inputLockingBytecodeHex === walletLockingBytecodeHex
      ) {
        input.unlockingBytecode = {
          compiler,
          data: {
            keys: { privateKeys: { key: privateKey } },
          },
          valueSatoshis: correspondingSourceOutput.valueSatoshis,
          script: "unlock",
          token: correspondingSourceOutput.token,
        }
      }
    }
  };

  // generate and encode transaction
  const generated = generateTransaction(txTemplate);
  if (!generated.success){
    const generationError = generated;
    throw Error(JSON.stringify(generationError, null, 2));
  }

  const encodedTransaction = encodeTransaction(generated.transaction);
  return encodedTransaction;
}

export const processWcTransactionObject = async (
  wcTransactionObject: WcTransactionObject,
  signingInfo: { privateKey: Uint8Array, pubkeyCompressed?: Uint8Array, walletLockingBytecodeHex?: string },
  networkProvider?: NetworkProvider,
): Promise<string> => {
  const signedTransaction = signWcTransactionObject(wcTransactionObject, signingInfo);
  const hexSignedTransaction = binToHex(signedTransaction);

  if (wcTransactionObject.broadcast) {
    if (!networkProvider) {
      throw new Error("NetworkProvider is required for broadcasting transactions");
    }

    await networkProvider.sendRawTransaction(hexSignedTransaction);
  }

  return hexSignedTransaction;
}