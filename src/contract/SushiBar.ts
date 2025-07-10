import { Contract, NetworkProvider } from "cashscript";
import { Wallet, TestNetWallet } from "mainnet-js";
import { getContracts, vmToBigInt } from "../utils";
import { deploy } from "./functions/deploy";
import { enter, leave } from "./functions/enterOrLeave";
import { incentivize } from "./functions/incentivize";
import SushiArtifact from "../../artifacts/Sushi.artifact";
import xSushiArtifact from "../../artifacts/xSushi.artifact";
import SushiBarArtifact from "../../artifacts/SushiBar.artifact";

export class SushiBar {
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
  }: {
    sushiCategory?: string;
    wallet: Wallet | TestNetWallet;
    provider: NetworkProvider;
  }) {
    const result = await deploy({
      provider: provider,
      wallet: wallet,
      sushiCategory: sushiCategory,
    })

    return new SushiBar(result.sushiCategory, result.xSushiCategory, result.sushiBarCategory, provider);
  }

  constructor(sushiCategory: string, xSushiCategory: string, sushiBarCategory: string, provider: NetworkProvider) {
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
    wallet: Wallet | TestNetWallet;
  }) {
    return enter({
      amountSushi,
      wallet,
      provider: this.sushiBarContract.provider,
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
    wallet: Wallet | TestNetWallet;
  }) {
    return leave({
      amountXSushi,
      wallet,
      provider: this.sushiBarContract.provider,
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
    wallet: Wallet | TestNetWallet;
  }) {
    return incentivize({
      amountSushi,
      wallet,
      provider: this.sushiBarContract.provider,
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
