import { IConnector } from "@bch-wc2/interfaces";
import { NetworkProvider } from "cashscript";
import { BaseWallet } from "mainnet-js";
export declare const enter: ({ amountSushi, wallet, provider, connector, sushiCategory, xSushiCategory, sushiBarCategory, }: {
    amountSushi: bigint;
    wallet: BaseWallet;
    provider: NetworkProvider;
    connector: IConnector;
    sushiCategory: string;
    xSushiCategory: string;
    sushiBarCategory: string;
}) => Promise<bigint>;
export declare const leave: ({ amountXSushi, wallet, provider, connector, sushiCategory, xSushiCategory, sushiBarCategory, }: {
    amountXSushi: bigint;
    wallet: BaseWallet;
    provider: NetworkProvider;
    connector: IConnector;
    sushiCategory: string;
    xSushiCategory: string;
    sushiBarCategory: string;
}) => Promise<bigint>;
export declare const enterOrLeave: ({ enter, amount, wallet, provider, connector, sushiCategory, xSushiCategory, sushiBarCategory, }: {
    enter: boolean;
    amount: bigint;
    wallet: BaseWallet;
    provider: NetworkProvider;
    connector: IConnector;
    sushiCategory: string;
    xSushiCategory: string;
    sushiBarCategory: string;
}) => Promise<bigint>;
