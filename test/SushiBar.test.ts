import { PrivKeyConnector } from "@bch-wc2/privkey-connector";
import { MockNetworkProvider, randomToken, randomUtxo } from "cashscript";
import { SushiBar, xSushiScale } from "../src";
import { aliceAddress, alicePriv, bobAddress, bobPriv, charlieAddress, charliePriv, daveAddress, davePriv, MockWallet } from "./shared";

let provider: MockNetworkProvider;
let sushiBar: SushiBar;

describe("SushiBar", function () {
  beforeEach(async function () {
    provider = new MockNetworkProvider();
    provider.reset();
    provider.addUtxo(daveAddress, randomUtxo({}));

    const wallet = await MockWallet(provider, davePriv);

    const connector = new PrivKeyConnector({ privateKey: wallet.privateKey, pubkeyCompressed: wallet.publicKeyCompressed, networkProvider: provider });

    sushiBar = await SushiBar.deploy({
      wallet,
      provider,
      connector,
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

    const amount = 100n;
    const result = await sushiBar.enter({
      wallet: await MockWallet(provider, alicePriv),
      amountSushi: amount,
    });

    expect(result).toBe(amount * xSushiScale);

    const { totalSushi, totalShares } = await sushiBar.getState();
    expect(totalSushi).toBe(amount + 1n);
    expect(totalShares).toBe(result + 1n * xSushiScale);

    const aliceWallet = await MockWallet(provider, alicePriv);
    expect(await aliceWallet.getTokenBalance(sushiBar.sushiCategory)).toBe(0n);
    expect(await aliceWallet.getTokenBalance(sushiBar.xSushiCategory,)).toBe(result);
  });

  it("should not allow withraw more than what you have", async function () {
    await sushiBar.enter({
      wallet: await MockWallet(provider, alicePriv),
      amountSushi: 100n,
    });

    await expect(sushiBar.leave({
      wallet: await MockWallet(provider, alicePriv),
      amountXSushi: 200n * xSushiScale,
    })).rejects.toThrow("Not enough xSushi available in SushiBar to leave");
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

    expect(await alliceWallet.getTokenBalance(sushiBar.xSushiCategory,)).toBe(20n * xSushiScale);
    expect(await bobWallet.getTokenBalance(sushiBar.xSushiCategory,)).toBe(10n * xSushiScale);

    {
      const { totalSushi, totalShares } = await sushiBar.getState();
      expect(totalSushi).toBe(31n);
      expect(totalShares).toBe(31n * xSushiScale);
    }

    // SushiBar get 20 more SUSHIs from an external source.
    await sushiBar.incentivize({
      wallet: await MockWallet(provider, charliePriv),
      amountSushi: 20n,
    });

    {
      const { totalSushi, totalShares } = await sushiBar.getState();
      expect(totalSushi).toBe(51n);
      expect(totalShares).toBe(31n * xSushiScale);
    }

    // Alice deposits 10 more SUSHIs. She should receive 10*31/51 = 6 shares.
    await sushiBar.enter({
      wallet: alliceWallet,
      amountSushi: 10n,
    });

    {
      const { totalSushi, totalShares } = await sushiBar.getState();
      expect(totalSushi).toBe(61n);
      // 37078n instead of 37n for scale factor 1000
      expect(totalShares).toBe(31n * xSushiScale + (10n * xSushiScale * 31n / 51n));
    }

    expect(await alliceWallet.getTokenBalance(sushiBar.xSushiCategory,)).toBe(20n * xSushiScale + (10n * xSushiScale * 31n / 51n));
    expect(await bobWallet.getTokenBalance(sushiBar.xSushiCategory,)).toBe(10n * xSushiScale);

    // Bob withdraws 5 shares. He should receive 5*60/36 = 8 shares
    await sushiBar.leave({
      wallet: bobWallet,
      amountXSushi: 5n * xSushiScale,
    });
    expect(await alliceWallet.getTokenBalance(sushiBar.xSushiCategory,)).toBe(20n * xSushiScale + (10n * xSushiScale * 31n / 51n));
    expect(await bobWallet.getTokenBalance(sushiBar.xSushiCategory,)).toBe(5n * xSushiScale);

    {
      const { totalSushi, totalShares } = await sushiBar.getState();

      expect(totalSushi).toBe(53n);
      expect(totalShares).toBe(31n * xSushiScale + (10n * xSushiScale * 31n / 51n) - 5n * xSushiScale);
    }

    expect(await alliceWallet.getTokenBalance(sushiBar.sushiCategory)).toBe(70n);
    expect(await bobWallet.getTokenBalance(sushiBar.sushiCategory)).toBe(98n);
  });
});

describe("Custom token names", () => {
  beforeEach(async function () {
    provider = new MockNetworkProvider();
    provider.reset();
    provider.addUtxo(daveAddress, randomUtxo({}));

    const wallet = await MockWallet(provider, davePriv);

    const connector = new PrivKeyConnector({ privateKey: wallet.privateKey, pubkeyCompressed: wallet.publicKeyCompressed, networkProvider: provider });

    sushiBar = await SushiBar.deploy({
      wallet,
      provider,
      connector,
      tokenNames: {
        sushiName: "CustomSushi",
        xSushiName: "CustomxSushi",
        sushiBarName: "CustomSushiBar",
      },
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

    })).rejects.toThrow("Not enough CustomSushi available to enter");

    const amount = 100n;
    const result = await sushiBar.enter({
      wallet: await MockWallet(provider, alicePriv),
      amountSushi: amount,
    });

    expect(result).toBe(amount * xSushiScale);

    const { totalSushi, totalShares } = await sushiBar.getState();
    expect(totalSushi).toBe(amount + 1n);
    expect(totalShares).toBe(result + 1n * xSushiScale);

    const aliceWallet = await MockWallet(provider, alicePriv);
    expect(await aliceWallet.getTokenBalance(sushiBar.sushiCategory)).toBe(0n);
    expect(await aliceWallet.getTokenBalance(sushiBar.xSushiCategory,)).toBe(result);
  });

  it("should not allow withraw more than what you have", async function () {
    await sushiBar.enter({
      wallet: await MockWallet(provider, alicePriv),
      amountSushi: 100n,
    });

    await expect(sushiBar.leave({
      wallet: await MockWallet(provider, alicePriv),
      amountXSushi: 200n * xSushiScale,
    })).rejects.toThrow("Not enough CustomxSushi available in CustomSushiBar to leave");
  });
});