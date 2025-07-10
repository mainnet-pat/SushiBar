import { MockNetworkProvider, NetworkProvider, randomToken, randomUtxo } from "cashscript";
import { deploy, enter, getContracts, incentivize, leave, vmToBigInt } from "../src";
import { aliceAddress, alicePriv, bobAddress, bobPriv, charlieAddress, charliePriv, daveAddress, davePriv, MockWallet } from "./shared";

let provider: MockNetworkProvider;
let categories: {
  sushiCategory: string;
  xSushiCategory: string;
  sushiBarCategory: string;
};

describe("SushiBar", function () {
  beforeEach(async function () {
    provider = new MockNetworkProvider();
    provider.reset();
    provider.addUtxo(daveAddress, randomUtxo({}));

    const wallet = await MockWallet(provider, davePriv);

    categories = await deploy({
      wallet, provider,
    });

    provider.addUtxo(aliceAddress, randomUtxo());
    provider.addUtxo(aliceAddress, randomUtxo({
      token: randomToken({
        amount: 100n,
        category: categories.sushiCategory,
      }),
    }));

    provider.addUtxo(bobAddress, randomUtxo());
    provider.addUtxo(bobAddress, randomUtxo({
      token: randomToken({
        amount: 100n,
        category: categories.sushiCategory,
      }),
    }));

    provider.addUtxo(charlieAddress, randomUtxo());
    provider.addUtxo(charlieAddress, randomUtxo({
      token: randomToken({
        amount: 100n,
        category: categories.sushiCategory,
      }),
    }));
  });

  it("should not allow enter if not enough tokens", async function () {
    await expect(enter({
      wallet: await MockWallet(provider, alicePriv),
      provider: provider,
      sushiCategory: categories.sushiCategory,
      xSushiCategory: categories.xSushiCategory,
      sushiBarCategory: categories.sushiBarCategory,
      amountSushi: 200n, // Alice only has 100 SUSHI
    })).rejects.toThrow("Not enough Sushi available to enter");

    const result = await enter({
      wallet: await MockWallet(provider, alicePriv),
      provider: provider,
      sushiCategory: categories.sushiCategory,
      xSushiCategory: categories.xSushiCategory,
      sushiBarCategory: categories.sushiBarCategory,
      amountSushi: 100n,
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

    const aliceWallet = await MockWallet(provider, alicePriv);
    expect(await aliceWallet.getTokenBalance(categories.sushiCategory)).toBe(0n);
    expect(await aliceWallet.getTokenBalance(categories.xSushiCategory)).toBe(100n);
  });

  it("should not allow withraw more than what you have", async function () {
    await enter({
      wallet: await MockWallet(provider, alicePriv),
      provider: provider,
      sushiCategory: categories.sushiCategory,
      xSushiCategory: categories.xSushiCategory,
      sushiBarCategory: categories.sushiBarCategory,
      amountSushi: 100n,
    });

    await expect(leave({
      wallet: await MockWallet(provider, alicePriv),
      provider: provider,
      sushiCategory: categories.sushiCategory,
      xSushiCategory: categories.xSushiCategory,
      sushiBarCategory: categories.sushiBarCategory,
      amountXSushi: 200n,
    })).rejects.toThrow("Not enough Sushi available in SushiBar to leave");
  });

  it("should work with more than one participant", async function () {
    const alliceWallet = await MockWallet(provider, alicePriv);
    const bobWallet = await MockWallet(provider, bobPriv);

    // Alice enters and gets 20 shares. Bob enters and gets 10 shares.
    await enter({
      wallet: alliceWallet,
      provider: provider,
      sushiCategory: categories.sushiCategory,
      xSushiCategory: categories.xSushiCategory,
      sushiBarCategory: categories.sushiBarCategory,
      amountSushi: 20n,
    });

    await enter({
      wallet: bobWallet,
      provider: provider,
      sushiCategory: categories.sushiCategory,
      xSushiCategory: categories.xSushiCategory,
      sushiBarCategory: categories.sushiBarCategory,
      amountSushi: 10n,
    });

    expect(await alliceWallet.getTokenBalance(categories.xSushiCategory)).toBe(20n);
    expect(await bobWallet.getTokenBalance(categories.xSushiCategory)).toBe(10n);

    {
      const contracts = getContracts(
        categories.sushiCategory,
        categories.xSushiCategory,
        categories.sushiBarCategory,
        provider
      );
      const sushiBarContractUtxo = (await contracts.sushiBar.getUtxos())[0]!;

      const totalSushi = vmToBigInt(sushiBarContractUtxo.token!.nft!.commitment.slice(0, 16));
      const totalShares = vmToBigInt(sushiBarContractUtxo.token!.nft!.commitment.slice(16, 32));

      expect(totalSushi).toBeGreaterThanOrEqual(31n);
      expect(totalShares).toBeGreaterThanOrEqual(30n);
    }

    // SushiBar get 20 more SUSHIs from an external source.
    await incentivize({
      wallet: await MockWallet(provider, charliePriv),
      provider: provider,
      sushiCategory: categories.sushiCategory,
      xSushiCategory: categories.xSushiCategory,
      sushiBarCategory: categories.sushiBarCategory,
      amountSushi: 20n,
    });
    // Alice deposits 10 more SUSHIs. She should receive 10*30/50 = 6 shares.
    await enter({
      wallet: alliceWallet,
      provider: provider,
      sushiCategory: categories.sushiCategory,
      xSushiCategory: categories.xSushiCategory,
      sushiBarCategory: categories.sushiBarCategory,
      amountSushi: 10n,
    });

    expect(await alliceWallet.getTokenBalance(categories.xSushiCategory)).toBe(26n);
    expect(await bobWallet.getTokenBalance(categories.xSushiCategory)).toBe(10n);
    // // Bob withdraws 5 shares. He should receive 5*60/36 = 8 shares
    await leave({
      wallet: bobWallet,
      provider: provider,
      sushiCategory: categories.sushiCategory,
      xSushiCategory: categories.xSushiCategory,
      sushiBarCategory: categories.sushiBarCategory,
      amountXSushi: 5n,
    });
    expect(await alliceWallet.getTokenBalance(categories.xSushiCategory)).toBe(26n);
    expect(await bobWallet.getTokenBalance(categories.xSushiCategory)).toBe(5n);

    {
      const contracts = getContracts(
        categories.sushiCategory,
        categories.xSushiCategory,
        categories.sushiBarCategory,
        provider
      );
      const sushiBarContractUtxo = (await contracts.sushiBar.getUtxos())[0]!;

      const totalSushi = vmToBigInt(sushiBarContractUtxo.token!.nft!.commitment.slice(0, 16));
      const totalShares = vmToBigInt(sushiBarContractUtxo.token!.nft!.commitment.slice(16, 32));

      expect(totalSushi).toBeGreaterThanOrEqual(53n);
      expect(totalShares).toBeGreaterThanOrEqual(30n);
    }

    expect(await alliceWallet.getTokenBalance(categories.sushiCategory)).toBe(70n);
    expect(await bobWallet.getTokenBalance(categories.sushiCategory)).toBe(98n);
  });
});
