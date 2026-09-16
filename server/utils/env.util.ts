import "dotenv";
import { object } from "zod";
import { ErrorLogger } from "../config/errorLog";

type ENVTYPES = {
  PORT: string;
  LOG_LEVEL: string;
  NODE_ENV: string;
  DATABASE_URL: string;
  SESSION_SECRET: string;
  MAILER_NAME: string;
  MAILER_PASSWORD: string;
  SENDER_EMAIL: string;
  CLIENT_URL: string;
  PAYSTACK_CLIENT_URL: string;
  PAYSTACK_SECRET_KEY: string;
  REDIS_URL: string;
};

const envValue = (value: string): string => {
  const key = process.env[value];
  if (!key) {
    ErrorLogger(`${value} is required`);
  }
  return key!;
};

export const ENV = {
  PORT: envValue("PORT"),
  LOG_LEVEL: envValue("LOG_LEVEL"),
  NODE_ENV: envValue("NODE_ENV"),
  DATABASE_URL: envValue("DATABASE_URL"),
  SESSION_SECRET: envValue("SESSION_SECRET"),
  MAILER_NAME: envValue("MAILER_NAME"),
  MAILER_PASSWORD: envValue("MAILER_PASSWORD"),
  SENDER_EMAIL: envValue("SENDER_EMAIL"),
  CLIENT_URL: envValue("CLIENT_URL"),
  PAYSTACK_CLIENT_URL: envValue("PAYSTACK_CLIENT_URL"),
  PAYSTACK_SECRET_KEY: envValue("PAYSTACK_SECRET_KEY"),
  REDIS_URL: envValue("REDIS_URL"),
} satisfies Readonly<ENVTYPES>;
