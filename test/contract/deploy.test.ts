import { MockNetworkProvider, randomUtxo } from "cashscript";
import { aliceAddress, MockWallet } from "../shared";
import { getTokenGenesisUtxo } from "../../src/contract/functions/deploy.js";
import { MaxSushiBarShares } from "../../src/contract/const.js";
import { SushiBar } from "../../src/index.js";

describe("Deployment tests", () => {
  test("Should deploy all contracts", async () => {
    const provider = new MockNetworkProvider();
    provider.reset();
    provider.addUtxo(aliceAddress, randomUtxo({}));

    const wallet = await MockWallet(provider);

    const sushiBar = await SushiBar.deploy({
      wallet, provider,
    });

    expect(sushiBar.sushiCategory).toBeDefined();
    expect(sushiBar.xSushiCategory).toBeDefined();
    expect(sushiBar.sushiBarCategory).toBeDefined();

    expect(await sushiBar.sushiContract.getUtxos()).toHaveLength(1);
    expect(await sushiBar.xSushiContract.getUtxos()).toHaveLength(1);
    expect(await sushiBar.sushiBarContract.getUtxos()).toHaveLength(1);
  });

  test("Given sushi token is already created, deploy all contracts", async () => {
    const provider = new MockNetworkProvider();
    provider.reset();
    provider.addUtxo(aliceAddress, randomUtxo({}));

    const wallet = await MockWallet(provider);

    const genesisUtxo = await getTokenGenesisUtxo({ wallet, provider });
    const response = await wallet.tokenGenesis({
      amount: MaxSushiBarShares,
    }, [], {
      ensureUtxos: [genesisUtxo],
      queryBalance: false,
    });

    const sushiCategory = response.tokenIds![0]!;

    const sushiBar = await SushiBar.deploy({
      wallet, provider,
      sushiCategory: sushiCategory,
    });

    expect(sushiBar.sushiCategory).toBe(sushiCategory);
    expect(sushiBar.xSushiCategory).toBeDefined();
    expect(sushiBar.sushiBarCategory).toBeDefined();

    expect(await sushiBar.sushiContract.getUtxos()).toHaveLength(1);
    expect(await sushiBar.xSushiContract.getUtxos()).toHaveLength(1);
    expect(await sushiBar.sushiBarContract.getUtxos()).toHaveLength(1);
  });
});