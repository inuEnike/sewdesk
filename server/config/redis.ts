import { createClient } from "redis";
import { logger } from "./logger";
import { ErrorLogger } from "./errorLog";
import { ENV } from "../utils/env.util";

export const redis = createClient({
  url: ENV.REDIS_URL,
});

export const connectRedis = async () => {
  try {
    await redis.connect();
    logger.info("Redis connected successfully");
  } catch (error) {
    ErrorLogger(error, "An error occured while trying to connect redis");
  }
};

export const disconnectRedis = async () => {
  try {
    if (!redis.isOpen) {
      return;
    }
    await redis.close();
    logger.info("Redis disconnected successfully");
  } catch (error) {
    ErrorLogger(error, "An error occured while trying to disconnect redis");
  }
};
