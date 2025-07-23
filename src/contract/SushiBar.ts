import { IConnector } from "@bch-wc2/interfaces";
import { Contract, NetworkProvider, Utxo } from "cashscript";
import { BaseWallet } from "mainnet-js";
import SushiArtifact from "../../artifacts/Sushi.artifact.js";
import SushiBarArtifact from "../../artifacts/SushiBar.artifact.js";
import xSushiArtifact from "../../artifacts/xSushi.artifact.js";
import { getContracts, vmToBigInt } from "../utils.js";
import { deploy } from "./functions/deploy.js";
import { enter, leave } from "./functions/enterOrLeave.js";
import { incentivizeOrMerge } from "./functions/incentivizeOrMerge.js";

export class SushiBar {
  public connector: IConnector;

  public sushiContract: Contract<typeof SushiArtifact>;
  public xSushiContract: Contract<typeof xSushiArtifact>;
  public sushiBarContract: Contract<typeof SushiBarArtifact>;

  public sushiCategory: string;
  public xSushiCategory: string;
  public sushiBarCategory: string;

  static async deploy({
    sushiCategory,
    wallet,
    provider,
    connector,
  }: {
    sushiCategory?: string;
    wallet: BaseWallet;
    provider: NetworkProvider;
    connector: IConnector;
  }) {
    const result = await deploy({
      provider: provider,
      wallet: wallet,
      sushiCategory: sushiCategory,
      connector: connector,
    });

    return new SushiBar(result.sushiCategory, result.xSushiCategory, result.sushiBarCategory, provider, connector);
  }

  constructor(sushiCategory: string, xSushiCategory: string, sushiBarCategory: string, provider: NetworkProvider, connector: IConnector) {
    this.connector = connector;

    const contracts = getContracts(sushiCategory, xSushiCategory, sushiBarCategory, provider);

    this.sushiContract = contracts.sushi;
    this.xSushiContract = contracts.xSushi;
    this.sushiBarContract = contracts.sushiBar;

    this.sushiCategory = sushiCategory;
    this.xSushiCategory = xSushiCategory;
    this.sushiBarCategory = sushiBarCategory;
  }

  async enter({
    amountSushi,
    wallet,
  }: {
    amountSushi: bigint;
    wallet: BaseWallet;
  }) {
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

  async leave({
    amountXSushi,
    wallet,
  }: {
    amountXSushi: bigint;
    wallet: BaseWallet;
  }) {
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

  async incentivize({
    amountSushi,
    wallet,
  }: {
    amountSushi: bigint;
    wallet: BaseWallet;
  }) {
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

  async merge({
    utxo,
    wallet,
  }: {
    utxo: Utxo; // The UTXO to merge with
    wallet: BaseWallet;
  }) {
    return incentivizeOrMerge({
      amount: utxo.token!.amount,
      inputTokenCategory: utxo.token!.category,
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
    const sushiBarContractUtxo = (await this.sushiBarContract.getUtxos())[0]!;

    const totalSushi = vmToBigInt(sushiBarContractUtxo.token!.nft!.commitment.slice(0, 16));
    const totalShares = vmToBigInt(sushiBarContractUtxo.token!.nft!.commitment.slice(16, 32));

    return {
      totalSushi,
      totalShares,
    }
  }
}
