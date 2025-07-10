import { MockNetworkProvider, randomUtxo } from "cashscript";
import { aliceAddress, MockWallet } from "../shared";
import { deploy, getTokenGenesisUtxo } from "../../src/contract/deploy.js";
import { getContracts } from "../../src/utils.js";

describe("Deployment tests", () => {
  test("Should deploy all contracts", async () => {
    const provider = new MockNetworkProvider();
    provider.reset();
    provider.addUtxo(aliceAddress, randomUtxo({}));

    const wallet = await MockWallet(provider);

    const result = await deploy({
      wallet, provider,
    });

    expect(result.sushiCategory).toBeDefined();
    expect(result.xSushiCategory).toBeDefined();
    expect(result.sushiBarCategory).toBeDefined();

    const contracts = getContracts(result.sushiCategory, result.xSushiCategory, result.sushiBarCategory, provider);

    expect(await contracts.sushi.getUtxos()).toHaveLength(1);
    expect(await contracts.xSushi.getUtxos()).toHaveLength(1);
    expect(await contracts.sushiBar.getUtxos()).toHaveLength(1);
  });

  test("Given sushi token is already created, deploy all contracts", async () => {
    const provider = new MockNetworkProvider();
    provider.reset();
    provider.addUtxo(aliceAddress, randomUtxo({}));

    const wallet = await MockWallet(provider);

    const genesisUtxo = await getTokenGenesisUtxo({ wallet, provider });
    const response = await wallet.tokenGenesis({
      amount: 100000000000n,
    }, [], {
      ensureUtxos: [genesisUtxo],
      queryBalance: false,
    });

    const sushiCategory = response.tokenIds![0]!;

    const result = await deploy({
      wallet, provider,
      sushiCategory: sushiCategory,
    });

    expect(result.sushiCategory).toBe(sushiCategory);
    expect(result.xSushiCategory).toBeDefined();
    expect(result.sushiBarCategory).toBeDefined();

    const contracts = getContracts(result.sushiCategory, result.xSushiCategory, result.sushiBarCategory, provider);

    expect(await contracts.sushi.getUtxos()).toHaveLength(1);
    expect(await contracts.xSushi.getUtxos()).toHaveLength(1);
    expect(await contracts.sushiBar.getUtxos()).toHaveLength(1);
  });
});