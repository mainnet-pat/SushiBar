import { PrivKeyConnector } from "@bch-wc2/privkey-connector";
import { MockNetworkProvider, randomUtxo } from "cashscript";
import { SushiBar } from "../../src";
import { aliceAddress, MockWallet } from "../shared";

describe("Enter tests", () => {
  test("Should enter SushiBar with Sushi", async () => {
    const provider = new MockNetworkProvider();
    provider.reset();
    provider.addUtxo(aliceAddress, randomUtxo({}));

    const wallet = await MockWallet(provider);

    const connector = new PrivKeyConnector({ privateKey: wallet.privateKey, pubkeyCompressed: wallet.publicKeyCompressed });

    const sushiBar = await SushiBar.deploy({
      wallet, provider, connector
    });

    // Enter SushiBar
    const amountToEnter = 100n; // Example amount
    const result = await sushiBar.enter({
      wallet,
      amountSushi: amountToEnter,
    });

    expect(result).toBe(100n);

    const { totalSushi, totalShares } = await sushiBar.getState();

    expect(totalSushi).toBe(101n);
    expect(totalShares).toBe(101n);
  });
});