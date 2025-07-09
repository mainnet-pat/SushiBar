import { bigIntToVmNumber, CashAddressNetworkPrefix, cashAddressToLockingBytecode, CashAddressType, decodeCashAddress, encodeCashAddress, hexToBin, padMinimallyEncodedVmNumber, vmNumberToBigInt } from "@bitauth/libauth";

export const min = (...args: bigint[]) => args.reduce((m, e) => e < m ? e : m);
export const require = (predicate: boolean, message: string) => {
  if (!predicate) {
    throw new Error(message);
  }
}

export const padVmNumber = (num: bigint, length: number) => {
  return padMinimallyEncodedVmNumber(bigIntToVmNumber(num), length).slice(0, length);
}

export const vmToBigInt = (vmNumber: string) => {
  return vmNumberToBigInt(hexToBin(vmNumber), { requireMinimalEncoding: false }) as bigint;
}

export function addressToLockScript(address: string): Uint8Array {
  const result = cashAddressToLockingBytecode(address);
  if (typeof result === 'string') throw new Error(result);

  return result.bytecode;
}

export const toCashAddress = (address: string) => {
  const decoded = decodeCashAddress(address);
  if (typeof decoded === 'string') {
    throw new Error(decoded);
  }

  return encodeCashAddress({
    ...decoded,
    prefix: address.split(':')[0] as CashAddressNetworkPrefix,
    type: decoded.type.replace('WithTokens', '') as CashAddressType,
  }).address;
}

export const toTokenAddress = (address: string) => {
  const decoded = decodeCashAddress(address);
  if (typeof decoded === 'string') {
    throw new Error(decoded);
  }

  return encodeCashAddress({
    ...decoded,
    prefix: decoded.prefix,
    type: decoded.type.replace('WithTokens', '') + 'WithTokens' as CashAddressType,
  }).address;
}
