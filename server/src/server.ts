import { PostgresDb, sql, type IDatabase } from "../config/db.ts";
import { logger } from "../config/logger.ts";
import { transport, verifyNodemailer } from "../config/nodemailer.ts";
import { connectRedis, disconnectRedis, redis } from "../config/redis.ts";

import { ENV } from "../utils/env.util.ts";
// import { app } from "./app.ts";

const PORT = ENV.PORT;

const database: IDatabase = new PostgresDb(sql);
await database.connect();
await connectRedis();

const { app } = await import("./app.ts");

const server = app.listen(PORT, () => {
  logger.info(`SewDesk server listening on port ${PORT} 🔥`);
  verifyNodemailer();
});

const stopProcesses = () => {
  logger.info("Shutting down SewDesk...");

  server.close(async () => {
    logger.info("Server closed");
    await database.disconnect();
    await disconnectRedis();
    transport.close();
    process.exit(0);
  });
};

process.on("SIGTERM", () => stopProcesses());
process.on("SIGINT", () => stopProcesses());
