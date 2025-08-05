import { IConnector } from "@bch-wc2/interfaces";
import { NetworkProvider } from "cashscript";
import { BaseWallet } from "mainnet-js";
export declare const enter: ({ amountSushi, wallet, provider, connector, sushiCategory, xSushiCategory, sushiBarCategory, tokenNames, }: {
    amountSushi: bigint;
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
export declare const leave: ({ amountXSushi, wallet, provider, connector, sushiCategory, xSushiCategory, sushiBarCategory, tokenNames, }: {
    amountXSushi: bigint;
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
export declare const enterOrLeave: ({ enter, amount, wallet, provider, connector, sushiCategory, xSushiCategory, sushiBarCategory, tokenNames, }: {
    enter: boolean;
    amount: bigint;
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
