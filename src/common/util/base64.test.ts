import { convBase64ToText, convTextToBase64, convTextToUrlsafeBase64, convUrlsafeBase64ToText } from "./base64";

const RawText = "<>?テスト<?>a";
const Base64 = "PD4/44OG44K544OIPD8+YQ==";
const UrlsafeBase64 = "PD4_44OG44K544OIPD8-YQ";

const toCodes = (str: string): string =>
  str
    .split("")
    .map((c) => c.charCodeAt(0).toString(10))
    .join(",");

describe("base64", () => {
  test("convTextToBase64", () => {
    const result = convTextToBase64(RawText);
    expect(result).toBe(Base64);
  });

  test("convBase64ToText", () => {
    const result = convBase64ToText(Base64);
    expect(toCodes(result)).toBe(toCodes(RawText));
  });

  test("convTextToUrlsafeBase64", () => {
    const result = convTextToUrlsafeBase64(RawText);
    expect(result).toBe(UrlsafeBase64);
  });

  test("convUrlsafeBase64ToText", () => {
    const result = convUrlsafeBase64ToText(UrlsafeBase64);
    expect(toCodes(result)).toBe(toCodes(RawText));
  });
});
