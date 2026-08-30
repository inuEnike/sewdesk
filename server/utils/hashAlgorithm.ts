import argon from "argon2";
import crypto from "node:crypto";

export const hashAlgorithm = async (value: string): Promise<string> => {
  const token = await argon.hash(value);

  return token;
};

export const compareToken = async (
  hash: string,
  plain: string,
): Promise<boolean> => {
  const verify = await argon.verify(hash, plain);
  return verify;
};

export const generateToken = (): string => {
  const token = crypto.randomUUID();
  return token;
};
