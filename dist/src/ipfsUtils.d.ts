import { BCMR, Registry, TokenGenesisRequest } from 'mainnet-js';
import { Signer } from './Signer.js';
export declare const getIPFSCid: (content: Uint8Array) => Promise<string>;
export declare const getFtRegistry: ({ now, tokenId, name, ticker, description, decimals, imageUrl, twitter, telegram, website, }: {
    now?: string;
    tokenId: string;
    name: string;
    ticker: string;
    description: string;
    decimals: number;
    imageUrl: string;
    twitter?: string;
    telegram?: string;
    website?: string;
}) => Registry;
export declare const updateRegistryTokenId: (registry: Registry, tokenId: string) => Registry;
export declare const uploadBcmr: (bcmr: BCMR) => Promise<string>;
export declare const upload: (fileOrRawData: string | Uint8Array | File) => Promise<string>;
export declare const dataToBin: (data: string | Uint8Array | File) => Promise<Uint8Array>;
export declare const pinToIpfs: ({ signer, fileOrRawData, userPrompt, }: {
    signer: Signer;
    fileOrRawData: Uint8Array | string | File;
    userPrompt: string;
}) => Promise<string | {
    cid: string;
    cidUri: string;
    cidIpfsLink: string;
}>;
export declare const tokenGenesisWithBcmrPinToIpfs: ({ signer, genesisRequest, bcmr, userPrompt, }: {
    signer: Signer;
    genesisRequest: TokenGenesisRequest;
    bcmr: Registry;
    userPrompt: string;
}) => Promise<{
    cid: string;
    cidUri: string;
    cidIpfsLink: string;
    txId?: string;
    balance?: import("mainnet-js").BalanceResponse;
    explorerUrl?: string;
    tokenIds?: string[];
    unsignedTransaction?: string;
    sourceOutputs?: import("mainnet-js").SourceOutput[];
    signedTransaction: string;
    signedTransactionHash: string;
}>;
