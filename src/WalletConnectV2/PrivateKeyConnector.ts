import { secp256k1, encodeLockingBytecodeP2pkh, encodeCashAddress, TransactionBCH, Input, Output, binToHex, sha256, utf8ToBin, hexToBin, binToBase64 } from "@bitauth/libauth";
import { ContractInfo } from "./interfaces";
import { signWcTransactionObject } from "./walletConnect";

export class PrivateKeyConnector {
  private _connected: boolean = true;
  private _address?: string;

  private walletLockingBytecodeHex: string;
  private pubkeyCompressed: Uint8Array;

  constructor(private privateKey: Uint8Array, pubkeyCompressed?: Uint8Array, walletLockingBytecodeHex?: string) {
    if (!this.privateKey || this.privateKey.length !== 32) {
      throw new Error("Invalid private key, must be a 32-byte Uint8Array");
    }

    if (!pubkeyCompressed) {
      this.pubkeyCompressed = secp256k1.derivePublicKeyCompressed(this.privateKey) as Uint8Array;
    } else {
      this.pubkeyCompressed = pubkeyCompressed;
    }

    if (!walletLockingBytecodeHex) {
      this.walletLockingBytecodeHex = binToHex(encodeLockingBytecodeP2pkh(this.pubkeyCompressed) as Uint8Array);
    } else {
      this.walletLockingBytecodeHex = walletLockingBytecodeHex;
    }
  }

  async address(): Promise<string | undefined> {
    if (this._address) {
      return this._address;
    }

    if (!this.pubkeyCompressed) {
      this.pubkeyCompressed = secp256k1.derivePublicKeyCompressed(this.privateKey) as Uint8Array;
    }

    const address = encodeCashAddress<true>({
      payload: hexToBin(this.walletLockingBytecodeHex),
      prefix: "bitcoincash",
      type: "p2pkh",
    }).address;

    return address;
  }

  async signTransaction(options: {transaction: string | TransactionBCH, sourceOutputs: (Input & Output & ContractInfo)[], broadcast?: boolean, userPrompt?: string}): Promise<{ signedTransaction: string, signedTransactionHash: string} | undefined> {
    const result = signWcTransactionObject(options, {
      privateKey: this.privateKey,
      pubkeyCompressed: this.pubkeyCompressed,
      walletLockingBytecodeHex: this.walletLockingBytecodeHex,
    });

    return {
      signedTransaction: binToHex(result),
      signedTransactionHash: binToHex(sha256.hash(sha256.hash(result)).reverse()),
    }
  }

  async signMessage(options: {message: string, userPrompt?: string}): Promise<string | undefined> {
    const message_magic = (str: string) => {
      const length = utf8ToBin(str).length.toString(16);
      const payload = `\x18Bitcoin Signed Message:\n`;
      return new Uint8Array([
        ...utf8ToBin(payload),
        ...hexToBin(length),
        ...utf8ToBin(str),
      ]);
    };

    const hash_message = (str: string) => {
      return sha256.hash(sha256.hash(message_magic(str)));
    }

    const messageHash = hash_message(options.message);
    const rs = secp256k1.signMessageHashRecoverableCompact(
      this.privateKey,
      messageHash
    );
    if (typeof rs === "string") {
      throw new Error(rs);
    }

    const electronEncoding = new Uint8Array([
      ...[31 + rs.recoveryId],
      ...rs.signature,
    ]);

    return binToBase64(electronEncoding);
  }

  async connect(): Promise<void> {
    this._connected = true;
  };

  async connected(): Promise<boolean> {
    return this._connected;
  };

  async disconnect(): Promise<void> {
    this._connected = false;
  };

  on(event: "addressChanged" | "disconnect" | string, callback: Function): void {}
}