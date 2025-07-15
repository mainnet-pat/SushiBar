import { PrivKeyConnector } from "@bch-wc2/privkey-connector";
import { MockNetworkProvider, randomUtxo } from "cashscript";
import { MaxSushiBarShares } from "../../src/contract/const.js";
import { getTokenGenesisUtxo } from "../../src/contract/functions/deploy.js";
import { SushiBar } from "../../src/index.js";
import { WCSigner } from "../../src/WcSigner.js";
import { aliceAddress, MockWallet } from "../shared";

describe("Deployment tests", () => {
  test("Should deploy all contracts", async () => {
    const provider = new MockNetworkProvider();
    provider.reset();
    provider.addUtxo(aliceAddress, randomUtxo({}));

    const wallet = await MockWallet(provider);

    const connector = new PrivKeyConnector({ privateKey: wallet.privateKey, pubkeyCompressed: wallet.publicKeyCompressed });

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

    const connector = new PrivKeyConnector({ privateKey: wallet.privateKey, pubkeyCompressed: wallet.publicKeyCompressed });
    const signer = new WCSigner(wallet, connector);

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
});