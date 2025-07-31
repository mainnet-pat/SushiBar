// @ts-ignore
import Hash from 'ipfs-only-hash';
import { BaseWallet, BCMR, hexToBin, OpReturnData, Registry, SendRequestType, sha256, TokenGenesisRequest, TokenSendRequest, utf8ToBin } from 'mainnet-js';
import { Signer } from './Signer';
import { consolidateUtxos } from './utils';

export const getIPFSCid = async (content: Uint8Array): Promise<string> => {
  return await Hash.of(content);
}

export const getFtRegistry = ({
  now, tokenId, name, ticker, description, decimals, imageUrl, twitter, telegram, website,
} : { now?: string, tokenId: string, name: string, ticker: string, description: string, decimals: number, imageUrl: string, twitter?: string, telegram?: string, website?: string }): Registry => {
  now = now ?? new Date().toISOString();

  return {
    "$schema": "https://cashtokens.org/bcmr-v2.schema.json",
    version: {
      major: 1,
      minor: 0,
      patch: 0
    },
    latestRevision: now,
    registryIdentity: {
      name: `${ticker} BCMR`,
      description: `${name} Bitcoin Cash Metadata Registry`,
      uris: {
        icon: imageUrl,
        ...(website && { web: website }),
      }
    },
    identities: {
      [tokenId]: {
        [now]: {
          name: name,
          description: description,
          token: {
            category: tokenId,
            decimals: decimals,
            symbol: ticker
          },
          migrated: now,
          uris: {
            icon: imageUrl,
            ...(twitter && { twitter: twitter }),
            ...(telegram && { telegram: telegram }),
            ...(website && { web: website }),
          }
        }
      }
    },
    license: "CC0-1.0"
  }
}

// we assume that there is a single identity in the Registry and one revision
export const updateRegistryTokenId = (registry: Registry, tokenId: string): Registry => {
  const identityName = Object.keys(registry.identities!)[0];
  const identity = Object.values(registry.identities!)[0]!;
  const revisionTimestamp = Object.keys(identity)[0]!;
  const revision = Object.values(identity)[0]!;
  revision.token!.category = tokenId;

  registry.identities![tokenId] = {[revisionTimestamp]: {...revision}};
  delete registry.identities![identityName];

  return registry;
}

export const uploadBcmr = (bcmr: BCMR) => {
  return upload(JSON.stringify(bcmr));
}

const uploadServiceUrl = "https://ipfs.pat.mn/u/";
export const upload = async (fileOrRawData: string | Uint8Array | File): Promise<string> => {
  const maxSize = 512 * 1024;

  let size = 0;
  const formData = new FormData();
  if (typeof fileOrRawData === "string") {
    size = fileOrRawData.length;
    formData.append("file", new Blob([fileOrRawData], {
      type: 'text/plain'
    }));
  } else if (fileOrRawData instanceof File) {
    size = fileOrRawData.size;
    formData.append("file", fileOrRawData);
  } else {
    size = fileOrRawData.length;
    formData.append("file", new Blob([fileOrRawData instanceof Uint8Array ? new Uint8Array(fileOrRawData) : fileOrRawData], {
      type: 'application/octet-stream'
    }));
  }

  if (size > maxSize) {
    throw new Error(`Raw data size exceeds ${maxSize/1024}kb (${Math.round(size/1024)}kb)`);
  }
  if (size === 0) {
    throw new Error(`Empty data`);
  }

  try {
    const response = await fetch(uploadServiceUrl, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();

    const url = data.url;
    if (url) {
      return url;
    } else {
      throw new Error("No URL returned from upload service");
    }
  } catch (e) {
    throw new Error(`Error uploading file: ${(e as any)?.response?.data?.error || (e as any)?.message}`);
  }
};

export const dataToBin = async (data: string | Uint8Array | File): Promise<Uint8Array> => {
  if (typeof data === "string") {
    return utf8ToBin(data);
  } else if (data instanceof Uint8Array) {
    return data;
  } else if (data instanceof File) {
    return new Uint8Array(await data.arrayBuffer());
  }

  throw new Error("Unsupported data type, expected string, Uint8Array or File");
}

// Helper to find a suitable funding UTXO, consolidating if needed
const getFundingUtxo = async (signer: Signer, minSatoshis = 300000) => {
  let utxos = await signer.wallet.getAddressUtxos();
  let fundingUtxo = utxos.filter(val => !val.token).filter(val => val.satoshis >= minSatoshis && val.vout === 0)[0];
  if (!fundingUtxo && utxos.filter(val => !val.token).length) {
    await consolidateUtxos({ signer, minSatoshis });
    utxos = await signer.wallet.getAddressUtxos();
    fundingUtxo = utxos.filter(val => !val.token).filter(val => val.satoshis >= minSatoshis && val.vout === 0)[0];
  }
  if (!fundingUtxo) {
    console.log(utxos);
    throw new Error("No suitable UTXOs available to fund this transaction");
  }
  return fundingUtxo;
};

// Helper to check if a CID exists on IPFS
const checkIpfsExists = async (cidIpfsLink: string) => {
  try {
    const existsResponse = await fetch(cidIpfsLink, {
      method: "HEAD",
      signal: AbortSignal.timeout(1000),
    });
    return existsResponse.ok;
  } catch {
    return false;
  }
};

// data pin to IPFS
export const pinToIpfs = async ({
  signer,
  fileOrRawData,
  userPrompt = "Create a new coin",
} : {
  signer: Signer,
  fileOrRawData: Uint8Array | string | File,
  userPrompt: string,
}) => {
  const connectedWallet = signer.wallet;
  const utxo = await getFundingUtxo(signer);

  const cid = await getIPFSCid(await dataToBin(fileOrRawData));
  const cidUri = `ipfs://${cid}`;
  const cidIpfsLink = `https://ipfs.tapswap.cash/ipfs/${cid}`;

  if (await checkIpfsExists(cidIpfsLink)) {
    return cidIpfsLink;
  }

  const uploadResponseUrl = await upload(fileOrRawData);
  if (!uploadResponseUrl) {
    throw new Error("Wrong workflow publishing BCMR to IPFS");
  }

  const requests: SendRequestType = [
    // IPFS pin request
    OpReturnData.fromArray(["IPBC", "PIN", uploadResponseUrl]),
    // IPFS pin service fee
    {cashaddr: "bitcoincash:qrsl56haj6kcw7v7lw9kzuh89v74maemqsq8h4rfqy", value: 0.0025, unit: "bch"},
  ];

  const signResult = await signer.send(requests, {
    ensureUtxos: [utxo],
    userPrompt: userPrompt,
    broadcast: false,
  });

  await connectedWallet.submitTransaction(hexToBin(signResult.signedTransaction), true);

  return { cid, cidUri, cidIpfsLink };
};

// token genesis with BCMR pin to IPFS
// BCMR's token category will be overwritten with the tokenId from the genesis UTXO
export const tokenGenesisWithBcmrPinToIpfs = async ({
  signer,
  genesisRequest,
  bcmr,
  userPrompt = "Pin file to ipfs",
} : {
  signer: Signer,
  genesisRequest: TokenGenesisRequest,
  bcmr: Registry,
  userPrompt: string,
}) => {
  const connectedWallet = signer.wallet;
  const utxo = await getFundingUtxo(signer);
  const tokenId = utxo.txid;
  bcmr = updateRegistryTokenId(bcmr, tokenId);

  const hash = sha256.hash(utf8ToBin(JSON.stringify(bcmr)));
  const cid = await getIPFSCid(utf8ToBin(JSON.stringify(bcmr)));
  const cidUri = `ipfs://${cid}`;
  const cidIpfsLink = `https://ipfs.tapswap.cash/ipfs/${cid}`;

  const exists = await checkIpfsExists(cidIpfsLink);

  const uploadResponseUrl = await uploadBcmr(bcmr);
  if (!uploadResponseUrl) {
    throw new Error("Wrong workflow publishing BCMR to IPFS");
  }

  const requests: SendRequestType = [
    // genesis output; this will also be the authhead, user is responsible for not burning it later
    new TokenSendRequest({
      ...genesisRequest,
      cashaddr: genesisRequest.cashaddr ?? connectedWallet.cashaddr,
      tokenId: tokenId,
    }),
    // BCMR output
    OpReturnData.fromArray(["BCMR", hash, cidUri]),
  ];

  if (!exists) {
    requests.push(
      // IPFS pin request
      OpReturnData.fromArray(["IPBC", "PIN", uploadResponseUrl]),
      // IPFS pin service fee
      {cashaddr: "bitcoincash:qrsl56haj6kcw7v7lw9kzuh89v74maemqsq8h4rfqy", value: 0.0025, unit: "bch"},
    );
  }

  const signResult = await signer.send(requests, {
    buildUnsigned: true,
    ensureUtxos: [utxo],
    queryBalance: false,
    userPrompt: userPrompt,
    broadcast: false,
    checkTokenQuantities: false,
    tokenOperation: "genesis",
  });

  await connectedWallet.submitTransaction(hexToBin(signResult.signedTransaction), true);

  return { ...signResult, cid, cidUri, cidIpfsLink };
};
