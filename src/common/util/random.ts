import { convBinToBase64, convNormalBase64ToUrlsafeBase64 } from "./base64";

export const getRandom = (length: number): string => {
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  return convNormalBase64ToUrlsafeBase64(convBinToBase64(arr).substring(0, length));
};
