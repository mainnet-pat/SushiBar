import { IConnector } from "@bch-wc2/interfaces";
import { Contract, NetworkProvider, Utxo } from "cashscript";
import { BaseWallet, Registry } from "mainnet-js";
import SushiArtifact from "../../artifacts/Sushi.artifact.js";
import SushiBarArtifact from "../../artifacts/SushiBar.artifact.js";
import xSushiArtifact from "../../artifacts/xSushi.artifact.js";
export declare class SushiBar {
    connector: IConnector;
    sushiContract: Contract<typeof SushiArtifact>;
    xSushiContract: Contract<typeof xSushiArtifact>;
    sushiBarContract: Contract<typeof SushiBarArtifact>;
    sushiCategory: string;
    xSushiCategory: string;
    sushiBarCategory: string;
    static deploy({ sushiCategory, wallet, provider, connector, bcmrs, }: {
        sushiCategory?: string;
        wallet: BaseWallet;
        provider: NetworkProvider;
        connector: IConnector;
        bcmrs?: {
            sushiBcmr?: Registry;
            xSushiBcmr?: Registry;
            sushiBarBcmr?: Registry;
        };
    }): Promise<SushiBar>;
    constructor(sushiCategory: string, xSushiCategory: string, sushiBarCategory: string, provider: NetworkProvider, connector: IConnector);
    enter({ amountSushi, wallet, }: {
        amountSushi: bigint;
        wallet: BaseWallet;
    }): Promise<bigint>;
    leave({ amountXSushi, wallet, }: {
        amountXSushi: bigint;
        wallet: BaseWallet;
    }): Promise<bigint>;
    incentivize({ amountSushi, wallet, }: {
        amountSushi: bigint;
        wallet: BaseWallet;
    }): Promise<bigint>;
    merge({ utxo, wallet, }: {
        utxo: Utxo;
        wallet: BaseWallet;
    }): Promise<bigint>;
    getState(): Promise<{
        totalSushi: bigint;
        totalShares: bigint;
    }>;
}
