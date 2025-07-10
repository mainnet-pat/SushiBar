import { MockNetworkProvider, randomUtxo } from "cashscript";
import { enter, deploy, getContracts, vmToBigInt } from "../../src";
import { aliceAddress, MockWallet } from "../shared";

describe("Enter tests", () => {
  test("Should enter SushiBar with Sushi", async () => {
    const provider = new MockNetworkProvider();
    provider.reset();
    provider.addUtxo(aliceAddress, randomUtxo({}));

    const wallet = await MockWallet(provider);

    const categories = await deploy({
      wallet, provider,
    });

    // Enter SushiBar
    const amountToEnter = 100n; // Example amount
    const result = await enter({
      wallet, provider,
      sushiCategory: categories.sushiCategory,
      xSushiCategory: categories.xSushiCategory,
      sushiBarCategory: categories.sushiBarCategory,
      amountSushi: amountToEnter,
    });

    expect(result).toBe(100n);

    const contracts = getContracts(
      categories.sushiCategory,
      categories.xSushiCategory,
      categories.sushiBarCategory,
      provider
    );
    const sushiBarContractUtxo = (await contracts.sushiBar.getUtxos())[0]!;

    const totalSushi = vmToBigInt(sushiBarContractUtxo.token!.nft!.commitment.slice(0, 16));
    const totalShares = vmToBigInt(sushiBarContractUtxo.token!.nft!.commitment.slice(16, 32));

    expect(totalSushi).toBeGreaterThanOrEqual(101n);
    expect(totalShares).toBeGreaterThanOrEqual(100n);
  });
});