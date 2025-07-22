import { IConnector } from "@bch-wc2/interfaces";
import { NetworkProvider } from "cashscript";
import { BaseWallet, UtxoI } from "mainnet-js";
import { WCSigner } from "../../WcSigner";
export declare const consolidateUtxos: ({ signer, }: {
    signer: WCSigner;
}) => Promise<import("mainnet-js").SendResponse>;
export declare const getTokenGenesisUtxo: ({ signer, }: {
    signer: WCSigner;
}) => Promise<UtxoI>;
export declare const deploy: ({ sushiCategory, wallet, provider, connector, }: {
    sushiCategory?: string;
    wallet: BaseWallet;
    provider: NetworkProvider;
    connector: IConnector;
}) => Promise<{
    sushiCategory: string;
    xSushiCategory: string;
    sushiBarCategory: string;
}>;
