import { getContracts, vmToBigInt } from "../utils.js";
import { deploy } from "./functions/deploy.js";
import { enter, leave } from "./functions/enterOrLeave.js";
import { incentivizeOrMerge } from "./functions/incentivizeOrMerge.js";
export class SushiBar {
    connector;
    sushiContract;
    xSushiContract;
    sushiBarContract;
    sushiCategory;
    xSushiCategory;
    sushiBarCategory;
    static async deploy({ sushiCategory, wallet, provider, connector, bcmrs, }) {
        const result = await deploy({
            provider: provider,
            wallet: wallet,
            sushiCategory: sushiCategory,
            connector: connector,
            bcmrs: bcmrs,
        });
        return new SushiBar(result.sushiCategory, result.xSushiCategory, result.sushiBarCategory, provider, connector);
    }
    constructor(sushiCategory, xSushiCategory, sushiBarCategory, provider, connector) {
        this.connector = connector;
        const contracts = getContracts(sushiCategory, xSushiCategory, sushiBarCategory, provider);
        this.sushiContract = contracts.sushi;
        this.xSushiContract = contracts.xSushi;
        this.sushiBarContract = contracts.sushiBar;
        this.sushiCategory = sushiCategory;
        this.xSushiCategory = xSushiCategory;
        this.sushiBarCategory = sushiBarCategory;
    }
    async enter({ amountSushi, wallet, }) {
        return enter({
            amountSushi,
            wallet,
            provider: this.sushiBarContract.provider,
            connector: this.connector,
            sushiCategory: this.sushiCategory,
            xSushiCategory: this.xSushiCategory,
            sushiBarCategory: this.sushiBarCategory,
        });
    }
    async leave({ amountXSushi, wallet, }) {
        return leave({
            amountXSushi,
            wallet,
            provider: this.sushiBarContract.provider,
            connector: this.connector,
            sushiCategory: this.sushiCategory,
            xSushiCategory: this.xSushiCategory,
            sushiBarCategory: this.sushiBarCategory,
        });
    }
    async incentivize({ amountSushi, wallet, }) {
        return incentivizeOrMerge({
            amount: amountSushi,
            inputTokenCategory: this.sushiCategory,
            mergeUtxo: undefined, // No merge UTXO for incentivize
            wallet,
            provider: this.sushiBarContract.provider,
            connector: this.connector,
            sushiCategory: this.sushiCategory,
            xSushiCategory: this.xSushiCategory,
            sushiBarCategory: this.sushiBarCategory,
        });
    }
    async merge({ utxo, wallet, }) {
        return incentivizeOrMerge({
            amount: utxo.token.amount,
            inputTokenCategory: utxo.token.category,
            mergeUtxo: utxo,
            wallet,
            provider: this.sushiBarContract.provider,
            connector: this.connector,
            sushiCategory: this.sushiCategory,
            xSushiCategory: this.xSushiCategory,
            sushiBarCategory: this.sushiBarCategory,
        });
    }
    // Returns the current state of the SushiBar contract
    // totalSushi: total amount of Sushi staked in the SushiBar
    // totalShares: total amount of xSushi shares emitted by the SushiBar
    async getState() {
        const sushiBarContractUtxo = (await this.sushiBarContract.getUtxos())[0];
        const totalSushi = vmToBigInt(sushiBarContractUtxo.token.nft.commitment.slice(0, 16));
        const totalShares = vmToBigInt(sushiBarContractUtxo.token.nft.commitment.slice(16, 32));
        return {
            totalSushi,
            totalShares,
        };
    }
}
//# sourceMappingURL=SushiBar.js.map