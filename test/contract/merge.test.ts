import { PrivKeyConnector } from "@bch-wc2/privkey-connector";
import { MockNetworkProvider, randomUtxo, Utxo } from "cashscript";
import { MaxSushiBarShares, SushiBar, xSushiScale } from "../../src";
import { aliceAddress, MockWallet } from "../shared";

describe("Merge tests", () => {
  test("Should merge Sushi from contract", async () => {
    const provider = new MockNetworkProvider();
    provider.reset();
    provider.addUtxo(aliceAddress, randomUtxo({}));

    const wallet = await MockWallet(provider);

    const connector = new PrivKeyConnector({ privateKey: wallet.privateKey, pubkeyCompressed: wallet.publicKeyCompressed, networkProvider: provider });

    const sushiBar = await SushiBar.deploy({
      wallet, provider, connector
    });

    expect((await sushiBar.sushiContract.getUtxos()).at(-1)).toMatchObject({
      token: {
        category: sushiBar.sushiCategory,
        amount: 1n,
      }
    });

    provider.addUtxo(sushiBar.sushiContract.address, randomUtxo({
      token: {
        category: sushiBar.sushiCategory,
        amount: 100n,
      }
    }));

    expect((await sushiBar.sushiContract.getUtxos()).at(-1)).toMatchObject({
      token: {
        category: sushiBar.sushiCategory,
        amount: 100n,
      }
    });

    {
      const { totalSushi, totalShares } = await sushiBar.getState();
      expect(totalSushi).toBe(1n);
      expect(totalShares).toBe(1n * xSushiScale);
    }

    // Merge Sushi
    const utxoToMerge: Utxo = (await sushiBar.sushiContract.getUtxos()).at(-1)!;
    expect(utxoToMerge.token!.amount).toBe(100n);

    const result = await sushiBar.merge({
      utxo: utxoToMerge,
      wallet,
    });

    expect(result).toBe(100n);

    {
      const { totalSushi, totalShares } = await sushiBar.getState();
      expect(totalSushi).toBe(101n);
      expect(totalShares).toBe(1n * xSushiScale);
    }
  });

  test("Should merge xSushi from contract", async () => {
    const provider = new MockNetworkProvider();
    provider.reset();
    provider.addUtxo(aliceAddress, randomUtxo({}));

    const wallet = await MockWallet(provider);

    const connector = new PrivKeyConnector({ privateKey: wallet.privateKey, pubkeyCompressed: wallet.publicKeyCompressed, networkProvider: provider });

    const sushiBar = await SushiBar.deploy({
      wallet, provider, connector
    });

    expect((await sushiBar.xSushiContract.getUtxos()).at(-1)).toMatchObject({
      token: {
        category: sushiBar.xSushiCategory,
        amount: MaxSushiBarShares - 1n * xSushiScale,
      }
    });

    provider.addUtxo(sushiBar.xSushiContract.address, randomUtxo({
      token: {
        category: sushiBar.xSushiCategory,
        amount: 100n,
      }
    }));

    expect((await sushiBar.xSushiContract.getUtxos()).at(-1)).toMatchObject({
      token: {
        category: sushiBar.xSushiCategory,
        amount: 100n,
      }
    });

    {
      const { totalSushi, totalShares } = await sushiBar.getState();
      expect(totalSushi).toBe(1n);
      expect(totalShares).toBe(1n * xSushiScale);
    }

    // Merge Sushi
    const utxoToMerge: Utxo = (await sushiBar.xSushiContract.getUtxos()).at(-1)!;
    expect(utxoToMerge.token!.amount).toBe(100n);

    const result = await sushiBar.merge({
      utxo: utxoToMerge,
      wallet,
    });

    expect(result).toBe(100n);

    {
      const { totalSushi, totalShares } = await sushiBar.getState();
      expect(totalSushi).toBe(1n);
      expect(totalShares).toBe(1n * xSushiScale + 100n);
    }
  });

  test("Should merge Sushi from p2pkh", async () => {
    const provider = new MockNetworkProvider();
    provider.reset();
    provider.addUtxo(aliceAddress, randomUtxo({}));

    const wallet = await MockWallet(provider);

    const connector = new PrivKeyConnector({ privateKey: wallet.privateKey, pubkeyCompressed: wallet.publicKeyCompressed, networkProvider: provider });

    const sushiBar = await SushiBar.deploy({
      wallet, provider, connector
    });

    expect((await sushiBar.sushiContract.getUtxos()).at(-1)).toMatchObject({
      token: {
        category: sushiBar.sushiCategory,
        amount: 1n,
      }
    });

    provider.addUtxo(aliceAddress, randomUtxo({
      token: {
        category: sushiBar.sushiCategory,
        amount: 100n,
      }
    }));

    expect((await provider.getUtxos(aliceAddress)).at(-1)).toMatchObject({
      token: {
        category: sushiBar.sushiCategory,
        amount: 100n,
      }
    });

    {
      const { totalSushi, totalShares } = await sushiBar.getState();
      expect(totalSushi).toBe(1n);
      expect(totalShares).toBe(1n * xSushiScale);
    }

    // Merge Sushi
    const utxoToMerge: Utxo = (await provider.getUtxos(aliceAddress)).at(-1)!;
    expect(utxoToMerge.token!.amount).toBe(100n);

    const result = await sushiBar.merge({
      utxo: utxoToMerge,
      wallet,
    });

    expect(result).toBe(100n);

    {
      const { totalSushi, totalShares } = await sushiBar.getState();
      expect(totalSushi).toBe(101n);
      expect(totalShares).toBe(1n * xSushiScale);
    }
  });

  test("Should merge xSushi from contract", async () => {
    const provider = new MockNetworkProvider();
    provider.reset();
    provider.addUtxo(aliceAddress, randomUtxo({}));

    const wallet = await MockWallet(provider);

    const connector = new PrivKeyConnector({ privateKey: wallet.privateKey, pubkeyCompressed: wallet.publicKeyCompressed, networkProvider: provider });

    const sushiBar = await SushiBar.deploy({
      wallet, provider, connector,
    });

    expect((await sushiBar.xSushiContract.getUtxos()).at(-1)).toMatchObject({
      token: {
        category: sushiBar.xSushiCategory,
        amount: MaxSushiBarShares - 1n * xSushiScale,
      }
    });

    provider.addUtxo(aliceAddress, randomUtxo({
      token: {
        category: sushiBar.xSushiCategory,
        amount: 100n,
      }
    }));

    expect((await provider.getUtxos(aliceAddress)).at(-1)).toMatchObject({
      token: {
        category: sushiBar.xSushiCategory,
        amount: 100n,
      }
    });

    {
      const { totalSushi, totalShares } = await sushiBar.getState();
      expect(totalSushi).toBe(1n);
      expect(totalShares).toBe(1n * xSushiScale);
    }

    // Merge Sushi
    const utxoToMerge: Utxo = (await provider.getUtxos(aliceAddress)).at(-1)!;
    expect(utxoToMerge.token!.amount).toBe(100n);

    const result = await sushiBar.merge({
      utxo: utxoToMerge,
      wallet,
    });

    expect(result).toBe(100n);

    {
      const { totalSushi, totalShares } = await sushiBar.getState();
      expect(totalSushi).toBe(1n);
      expect(totalShares).toBe(1n * xSushiScale + 100n);
    }
  });
});
