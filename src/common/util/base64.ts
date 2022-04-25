const CharToNumTable: { [index: string]: number } = {
  "0": 52,
  "1": 53,
  "2": 54,
  "3": 55,
  "4": 56,
  "5": 57,
  "6": 58,
  "7": 59,
  "8": 60,
  "9": 61,
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
  K: 10,
  L: 11,
  M: 12,
  N: 13,
  O: 14,
  P: 15,
  Q: 16,
  R: 17,
  S: 18,
  T: 19,
  U: 20,
  V: 21,
  W: 22,
  X: 23,
  Y: 24,
  Z: 25,
  a: 26,
  b: 27,
  c: 28,
  d: 29,
  e: 30,
  f: 31,
  g: 32,
  h: 33,
  i: 34,
  j: 35,
  k: 36,
  l: 37,
  m: 38,
  n: 39,
  o: 40,
  p: 41,
  q: 42,
  r: 43,
  s: 44,
  t: 45,
  u: 46,
  v: 47,
  w: 48,
  x: 49,
  y: 50,
  z: 51,
  "+": 62,
  "/": 63,
  "=": 64, // Padding
} as const;

const NumToCharTable: { [index: string]: string } = {};
Object.entries(CharToNumTable).forEach(([key, value]) => {
  NumToCharTable[value] = key;
});

export const convBase64ToText = (base64: string): string => {
  const results: number[] = [];

  for (let i = 0; i < base64.length; i += 4) {
    const char1 = base64[i];
    const char2 = i + 1 < base64.length ? base64[i + 1] : "=";
    const char3 = i + 2 < base64.length ? base64[i + 2] : "=";
    const char4 = i + 3 < base64.length ? base64[i + 3] : "=";

    const [first6bit, second6bit, third6bit, fourth6bit]: [
      number,
      number,
      number,
      number,
    ] = [
      CharToNumTable[char1] ?? 65,
      CharToNumTable[char2] ?? 65,
      CharToNumTable[char3] ?? 65,
      CharToNumTable[char4] ?? 65,
    ];

    const firstCharCode = first6bit < 64
      ? (first6bit << 2) | ((second6bit & 63) >> 4)
      : -1;
    const secondCharCode = second6bit < 64
      ? ((second6bit & 15) << 4) | ((third6bit & 63) >> 2)
      : -1;
    const thirdCharCode = third6bit < 64
      ? ((third6bit & 3) << 6) | (fourth6bit & 63)
      : -1;

    if (firstCharCode > 0) results.push(firstCharCode);
    if (secondCharCode > 0) results.push(secondCharCode);
    if (thirdCharCode > 0) results.push(thirdCharCode);
  }
  const uint8Array = Uint8Array.from(results);
  return new TextDecoder().decode(uint8Array);
};

export const convBinToBase64 = (codes: Uint8Array): string => {
  const results: string[] = [];
  for (let i = 0; i < codes.length; i += 3) {
    const code1: number = codes[i];
    const code2: number = i + 1 < codes.length ? codes[i + 1] : 0;
    const code3: number = i + 2 < codes.length ? codes[i + 2] : 0;

    const [char1, char2, char3, char4] = [
      code1 >> 2,
      ((code1 & 3) << 4) | (code2 >> 4),
      code2 !== 0 ? ((code2 & 15) << 2) | (code3 >> 6) : 64,
      code3 !== 0 ? code3 & 63 : 64,
    ];

    results.push(NumToCharTable[char1]);
    results.push(NumToCharTable[char2]);
    results.push(NumToCharTable[char3]);
    results.push(NumToCharTable[char4]);
  }
  return results.join("");
};

export const convTextToBase64 = (text: string): string => {
  return convBinToBase64(new TextEncoder().encode(text));
};

export const convNormalBase64ToUrlsafeBase64 = (base64: string): string =>
  base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");

export const convUrlsafeBase64ToNormalBase64 = (
  urlsafeBase64: string,
): string => urlsafeBase64.replace(/-/g, "+").replace(/_/g, "/");

export const convTextToUrlsafeBase64 = (text: string): string =>
  convNormalBase64ToUrlsafeBase64(convTextToBase64(text));

export const convUrlsafeBase64ToText = (urlsafeBase64: string): string =>
  convBase64ToText(convUrlsafeBase64ToNormalBase64(urlsafeBase64));
