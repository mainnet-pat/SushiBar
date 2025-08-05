import { IConnector } from "@bch-wc2/interfaces";
import { Contract, NetworkProvider, Utxo } from "cashscript";
import { BaseWallet, Registry } from "mainnet-js";
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
  public tokenNames: {
    sushiName?: string;
    xSushiName?: string;
    sushiBarName?: string;
  };

  static async deploy({
    sushiCategory,
    wallet,
    provider,
    connector,
    bcmrs,
    tokenNames = {
      sushiName: "Sushi",
      xSushiName: "xSushi",
      sushiBarName: "SushiBar",
    },
  }: {
    sushiCategory?: string;
    wallet: BaseWallet;
    provider: NetworkProvider;
    connector: IConnector;
    bcmrs?: {
      sushiBcmr?: Registry,
      xSushiBcmr?: Registry,
      sushiBarBcmr?: Registry,
    },
    tokenNames?: {
      sushiName?: string;
      xSushiName?: string;
      sushiBarName?: string;
    };
  }) {
    const result = await deploy({
      provider: provider,
      wallet: wallet,
      sushiCategory: sushiCategory,
      connector: connector,
      bcmrs: bcmrs,
    });

    return new SushiBar({
      sushiCategory: result.sushiCategory,
      xSushiCategory: result.xSushiCategory,
      sushiBarCategory: result.sushiBarCategory,
      provider,
      connector,
      tokenNames,
    });
  }

  constructor({
      sushiCategory,
      xSushiCategory,
      sushiBarCategory,
      provider,
      connector,
      tokenNames = {
        sushiName: "Sushi",
        xSushiName: "xSushi",
        sushiBarName: "SushiBar",
      },
    } : {
      sushiCategory: string;
      xSushiCategory: string;
      sushiBarCategory: string;
      provider: NetworkProvider;
      connector: IConnector;
      tokenNames?: {
        sushiName?: string;
        xSushiName?: string;
        sushiBarName?: string;
      };
    }) {
    this.connector = connector;
    this.tokenNames = tokenNames;

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
      tokenNames: this.tokenNames,
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
      tokenNames: this.tokenNames,
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
      tokenNames: this.tokenNames,
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
      tokenNames: this.tokenNames,
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
