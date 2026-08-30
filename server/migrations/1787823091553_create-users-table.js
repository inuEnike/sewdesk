/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.sql(`
            CREATE TABLE IF NOT EXISTS auth.users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                full_name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                phone_number VARCHAR(20) NOT NULL,
                is_verified BOOLEAN NOT NULL DEFAULT false,
                hashed_password TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'active'
                     CHECK (status IN ('active', 'warning', 'suspended')),
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),  
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()  
            )
        `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql(`
        DROP TABLE IF EXISTS auth.users CASCADE
        `);
};
