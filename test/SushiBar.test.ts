import { MockNetworkProvider, NetworkProvider, randomToken, randomUtxo } from "cashscript";
import { deploy, enter, getContracts, incentivize, leave, SushiBar, vmToBigInt } from "../src";
import { aliceAddress, alicePriv, bobAddress, bobPriv, charlieAddress, charliePriv, daveAddress, davePriv, MockWallet } from "./shared";

let provider: MockNetworkProvider;
let sushiBar: SushiBar;

describe("SushiBar", function () {
  beforeEach(async function () {
    provider = new MockNetworkProvider();
    provider.reset();
    provider.addUtxo(daveAddress, randomUtxo({}));

    const wallet = await MockWallet(provider, davePriv);

    sushiBar = await SushiBar.deploy({
      wallet,
      provider,
    });

    provider.addUtxo(aliceAddress, randomUtxo());
    provider.addUtxo(aliceAddress, randomUtxo({
      token: randomToken({
        amount: 100n,
        category: sushiBar.sushiCategory,
      }),
    }));

    provider.addUtxo(bobAddress, randomUtxo());
    provider.addUtxo(bobAddress, randomUtxo({
      token: randomToken({
        amount: 100n,
        category: sushiBar.sushiCategory,
      }),
    }));

    provider.addUtxo(charlieAddress, randomUtxo());
    provider.addUtxo(charlieAddress, randomUtxo({
      token: randomToken({
        amount: 100n,
        category: sushiBar.sushiCategory,
      }),
    }));
  });

  it("should not allow enter if not enough tokens", async function () {
    await expect(sushiBar.enter({
      wallet: await MockWallet(provider, alicePriv),
      amountSushi: 200n, // Alice only has 100 SUSHI
    })).rejects.toThrow("Not enough Sushi available to enter");

    const result = await sushiBar.enter({
      wallet: await MockWallet(provider, alicePriv),
      amountSushi: 100n,
    });

    expect(result).toBe(100n);

    const { totalSushi, totalShares } = await sushiBar.getState();
    expect(totalSushi).toBeGreaterThanOrEqual(101n);
    expect(totalShares).toBeGreaterThanOrEqual(101n);

    const aliceWallet = await MockWallet(provider, alicePriv);
    expect(await aliceWallet.getTokenBalance(sushiBar.sushiCategory)).toBe(0n);
    expect(await aliceWallet.getTokenBalance(sushiBar.xSushiCategory,)).toBe(100n);
  });

  it("should not allow withraw more than what you have", async function () {
    await sushiBar.enter({
      wallet: await MockWallet(provider, alicePriv),
      amountSushi: 100n,
    });

    await expect(sushiBar.leave({
      wallet: await MockWallet(provider, alicePriv),
      amountXSushi: 200n,
    })).rejects.toThrow("Not enough Sushi available in SushiBar to leave");
  });

  it("should work with more than one participant", async function () {
    const alliceWallet = await MockWallet(provider, alicePriv);
    const bobWallet = await MockWallet(provider, bobPriv);

    // Alice enters and gets 20 shares. Bob enters and gets 10 shares.
    await sushiBar.enter({
      wallet: alliceWallet,
      amountSushi: 20n,
    });

    await sushiBar.enter({
      wallet: bobWallet,
      amountSushi: 10n,
    });

    expect(await alliceWallet.getTokenBalance(sushiBar.xSushiCategory,)).toBe(20n);
    expect(await bobWallet.getTokenBalance(sushiBar.xSushiCategory,)).toBe(10n);

    {
      const { totalSushi, totalShares } = await sushiBar.getState();
      expect(totalSushi).toBeGreaterThanOrEqual(31n);
      expect(totalShares).toBeGreaterThanOrEqual(30n);
    }

    // SushiBar get 20 more SUSHIs from an external source.
    await sushiBar.incentivize({
      wallet: await MockWallet(provider, charliePriv),
      amountSushi: 20n,
    });
    // Alice deposits 10 more SUSHIs. She should receive 10*30/50 = 6 shares.
    await sushiBar.enter({
      wallet: alliceWallet,
      amountSushi: 10n,
    });

    expect(await alliceWallet.getTokenBalance(sushiBar.xSushiCategory,)).toBe(26n);
    expect(await bobWallet.getTokenBalance(sushiBar.xSushiCategory,)).toBe(10n);

    // Bob withdraws 5 shares. He should receive 5*60/36 = 8 shares
    await sushiBar.leave({
      wallet: bobWallet,
      amountXSushi: 5n,
    });
    expect(await alliceWallet.getTokenBalance(sushiBar.xSushiCategory,)).toBe(26n);
    expect(await bobWallet.getTokenBalance(sushiBar.xSushiCategory,)).toBe(5n);

    {
      const { totalSushi, totalShares } = await sushiBar.getState();

      expect(totalSushi).toBeGreaterThanOrEqual(53n);
      expect(totalShares).toBeGreaterThanOrEqual(30n);
    }

    expect(await alliceWallet.getTokenBalance(sushiBar.sushiCategory)).toBe(70n);
    expect(await bobWallet.getTokenBalance(sushiBar.sushiCategory)).toBe(98n);
  });
});
