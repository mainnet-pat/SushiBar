import { IConnector } from "@bch-wc2/interfaces";
import { NetworkProvider } from "cashscript";
import { BaseWallet, Registry } from "mainnet-js";
export declare const deploy: ({ sushiCategory, wallet, provider, connector, bcmrs, tokenNames, }: {
    sushiCategory?: string;
    wallet: BaseWallet;
    provider: NetworkProvider;
    connector: IConnector;
    bcmrs?: {
        sushiBcmr?: Registry;
        xSushiBcmr?: Registry;
        sushiBarBcmr?: Registry;
    };
    tokenNames?: {
        sushiName?: string;
        xSushiName?: string;
        sushiBarName?: string;
    };
}) => Promise<{
    sushiCategory: string;
    xSushiCategory: string;
    sushiBarCategory: string;
}>;
