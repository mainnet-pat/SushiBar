import { PrivKeyConnector } from "@bch-wc2/privkey-connector";
import { MockNetworkProvider, randomUtxo } from "cashscript";
import { MaxSushiBarShares } from "../../src/contract/const.js";
import { getFtRegistry, getTokenGenesisUtxo, SushiBar } from "../../src/index.js";
import { Signer } from "../../src/Signer.js";
import { aliceAddress, MockWallet } from "../shared";

describe("Deployment tests", () => {
  test("Should deploy all contracts", async () => {
    const provider = new MockNetworkProvider();
    provider.reset();
    provider.addUtxo(aliceAddress, randomUtxo({}));

    const wallet = await MockWallet(provider);

    const connector = new PrivKeyConnector({ privateKey: wallet.privateKey, pubkeyCompressed: wallet.publicKeyCompressed, networkProvider: provider });

    const sushiBar = await SushiBar.deploy({
      wallet, provider, connector,
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

    const connector = new PrivKeyConnector({ privateKey: wallet.privateKey, pubkeyCompressed: wallet.publicKeyCompressed, networkProvider: provider });
    const signer = new Signer(wallet, connector);

    const genesisUtxo = await getTokenGenesisUtxo({ signer });
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
      connector,
    });

    expect(sushiBar.sushiCategory).toBe(sushiCategory);
    expect(sushiBar.xSushiCategory).toBeDefined();
    expect(sushiBar.sushiBarCategory).toBeDefined();

    expect(await sushiBar.sushiContract.getUtxos()).toHaveLength(1);
    expect(await sushiBar.xSushiContract.getUtxos()).toHaveLength(1);
    expect(await sushiBar.sushiBarContract.getUtxos()).toHaveLength(1);
  });

  test("Should deploy all contracts with bcmrs", async () => {
    const provider = new MockNetworkProvider();
    provider.reset();
    provider.addUtxo(aliceAddress, randomUtxo({ satoshis: 100000000n }));

    const wallet = await MockWallet(provider);

    const connector = new PrivKeyConnector({ privateKey: wallet.privateKey, pubkeyCompressed: wallet.publicKeyCompressed, networkProvider: provider });

    const sushiBar = await SushiBar.deploy({
      wallet, provider, connector, bcmrs: {
        sushiBcmr: getFtRegistry({
          tokenId: "00".repeat(32),
          name: "Sushi",
          ticker: "SUSHI",
          description: "Sushi token for SushiBar",
          decimals: 2,
          imageUrl: "https://example.com/sushi.png",
        }),
        xSushiBcmr: getFtRegistry({
          tokenId: "11".repeat(32),
          name: "xSushi",
          ticker: "xSUSHI",
          description: "xSushi token for SushiBar",
          decimals: 2,
          imageUrl: "https://example.com/xsushi.png",
        }),
      },
    });

    expect(sushiBar.sushiCategory).toBeDefined();
    expect(sushiBar.xSushiCategory).toBeDefined();
    expect(sushiBar.sushiBarCategory).toBeDefined();

    expect(await sushiBar.sushiContract.getUtxos()).toHaveLength(1);
    expect(await sushiBar.xSushiContract.getUtxos()).toHaveLength(1);
    expect(await sushiBar.sushiBarContract.getUtxos()).toHaveLength(1);
  });
});
