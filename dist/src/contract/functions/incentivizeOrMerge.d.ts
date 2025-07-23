import { IConnector } from "@bch-wc2/interfaces";
import { NetworkProvider, Utxo } from "cashscript";
import { BaseWallet } from "mainnet-js";
export declare const incentivizeOrMerge: ({ amount, inputTokenCategory, mergeUtxo, wallet, provider, connector, sushiCategory, xSushiCategory, sushiBarCategory, }: {
    amount: bigint;
    inputTokenCategory: string;
    mergeUtxo?: Utxo;
    wallet: BaseWallet;
    provider: NetworkProvider;
    connector: IConnector;
    sushiCategory: string;
    xSushiCategory: string;
    sushiBarCategory: string;
}) => Promise<bigint>;
