import { Input, Output, TransactionBCH, TransactionCommon } from "@bitauth/libauth";

export interface IConnector {
  address: () => Promise<string | undefined>;
  signTransaction: (options: {transaction: string | TransactionBCH, sourceOutputs: (Input | Output | ContractInfo)[], broadcast?: boolean, userPrompt?: string}) => Promise<{ signedTransaction: string, signedTransactionHash: string} | undefined>;
  signMessage: (options: {message: string, userPrompt?: string}) => Promise<string | undefined>;
  connect: () => Promise<void>;
  connected: () => Promise<boolean>;
  disconnect: () => Promise<void>;
  on(event: string, callback: Function): void;
  on(event: "addressChanged", callback: Function): void;
  on(event: "disconnect", callback: Function): void;
};

export interface ContractInfo {
  contract?: {
    abiFunction: AbiFunction;
    redeemScript: Uint8Array;
    artifact: Partial<Artifact>;
  }
}

export interface AbiInput {
  name: string;
  type: string;
}

export interface AbiFunction {
  name: string;
  inputs: readonly AbiInput[];
}

export interface Artifact {
  contractName: string;
  constructorInputs: readonly AbiInput[];
  abi: readonly AbiFunction[];
  bytecode: string;
  source: string;
  compiler: {
    name: string;
    version: string;
  }
  updatedAt: string;
}

export interface WcTransactionOptions {
  broadcast?: boolean;
  userPrompt?: string;
}

export interface WcTransactionObject {
  transaction: TransactionCommon | string;
  sourceOutputs: WcSourceOutput[];
  broadcast?: boolean;
  userPrompt?: string;
}

export type WcSourceOutput = Input & Output & ContractInfo;
