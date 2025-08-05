import { IConnector } from "@bch-wc2/interfaces";
import { NetworkProvider, Utxo } from "cashscript";
import { BaseWallet } from "mainnet-js";
export declare const incentivizeOrMerge: ({ amount, inputTokenCategory, mergeUtxo, wallet, provider, connector, sushiCategory, xSushiCategory, sushiBarCategory, tokenNames, }: {
    amount: bigint;
    inputTokenCategory: string;
    mergeUtxo?: Utxo;
    wallet: BaseWallet;
    provider: NetworkProvider;
    connector: IConnector;
    sushiCategory: string;
    xSushiCategory: string;
    sushiBarCategory: string;
    tokenNames?: {
        sushiName?: string;
        xSushiName?: string;
        sushiBarName?: string;
    };
}) => Promise<bigint>;
