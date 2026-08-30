import { compareToken, generateToken, hashAlgorithm } from "./hashAlgorithm";

describe("HashAlgorithm", () => {
  it("should hash the token", async () => {
    let value = "my-token";
    expect(await hashAlgorithm(value)).not.toBe(value);
  });

  it("should compare the hashed token and the raw token, if the same, return true", async () => {
    const plain = "990f3a47-938d-4a85-9756-471d0f824218";
    const hash = await hashAlgorithm(plain);
    expect(await compareToken(hash, plain)).toBe(true);
  });

  it("should compare the token and the hashed token, if not the same, return false", async () => {
    const plain = "990f3a47-938d-4a85-9756-471d0f824218";
    const wrong_token = "12ii29993-929993-99939302";
    const hash = await hashAlgorithm(wrong_token);
    expect(await compareToken(hash, plain)).toBe(false);
  });

  it("should generate token and return a string", () => {
    expect(typeof generateToken()).toBe("string");
  });
});
