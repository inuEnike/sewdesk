import postgres, { type Sql } from "postgres";
import { ENV } from "../utils/env.util";
import { logger } from "./logger";
import { ErrorLogger } from "./errorLog";

export const sql = postgres(ENV.DATABASE_URL)

export interface IDatabase {
    connect: () => Promise<void>
    disconnect: () => Promise<void>
}

export class PostgresDb implements IDatabase {
    constructor(private readonly sql: Sql) { }
    async connect() {
        try {
            await sql`SELECT 1`;
            logger.info("connected to postgres 🥰");
        } catch (error) {   
            ErrorLogger(error);
            process.exit(1);
        }
    }

    async disconnect() {
        try {
            await sql.end();
            logger.info("Disconnect from postgres 🥰");
        } catch (error) {
            ErrorLogger(error);
            process.exit(1);
        }
    }
}
