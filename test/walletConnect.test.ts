import { MockNetworkProvider, randomUtxo } from "cashscript";
import { aliceAddress, alicePriv, bobAddress, MockWallet } from "./shared";
import { binToHex, SendRequest } from "mainnet-js";
import { generateWcTransactionObject, PrivateKeyConnector, signWcTransactionObject } from "../src/index.js";

describe("WalletConnect", () => {
  test("Creating unsigned transactions and signing them", async () => {
    const provider = new MockNetworkProvider();
    provider.reset();

    provider.addUtxo(aliceAddress, randomUtxo());
    expect(await provider.getUtxos(bobAddress)).toHaveLength(0);

    const wallet = await MockWallet(provider, alicePriv);

    const sendResponse = await wallet.send(new SendRequest({
      value: 1000,
      cashaddr: bobAddress,
      unit: "sat",
    }), {
      buildUnsigned: true,
      queryBalance: false,
    });

    const wcTransactionObject = generateWcTransactionObject(sendResponse, {
      userPrompt: "Please confirm the transaction",
    });

    const signedTransaction = signWcTransactionObject(wcTransactionObject, {
      privateKey: wallet.privateKey,
    });

    await provider.sendRawTransaction(binToHex(signedTransaction));

    expect(await provider.getUtxos(bobAddress)).toHaveLength(1);
  });

  test("PrivateKeyConnector signing", async () => {
    const provider = new MockNetworkProvider();
    provider.reset();

    provider.addUtxo(aliceAddress, randomUtxo());
    expect(await provider.getUtxos(bobAddress)).toHaveLength(0);

    const wallet = await MockWallet(provider, alicePriv);

    const sendResponse = await wallet.send(new SendRequest({
      value: 1000,
      cashaddr: bobAddress,
      unit: "sat",
    }), {
      buildUnsigned: true,
      queryBalance: false,
    });

    const wcTransactionObject = generateWcTransactionObject(sendResponse, {
      userPrompt: "Please confirm the transaction",
    });

    const privateKeyConnector = new PrivateKeyConnector(wallet.privateKey);

    const signedTransaction = await privateKeyConnector.signTransaction({
      transaction: wcTransactionObject.transaction,
      sourceOutputs: wcTransactionObject.sourceOutputs,
      broadcast: wcTransactionObject.broadcast,
      userPrompt: wcTransactionObject.userPrompt,
    });

    expect(signedTransaction).toBeDefined();
    expect(signedTransaction?.signedTransaction).toBeDefined();

    await provider.sendRawTransaction(signedTransaction!.signedTransaction);

    expect(await provider.getUtxos(bobAddress)).toHaveLength(1);
  });
});
