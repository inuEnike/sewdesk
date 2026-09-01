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
        CREATE TABLE IF NOT EXISTS business.plans(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(30) NOT NULL, 
            description TEXT NOT NULL,
            price NUMERIC(12, 2) NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),  
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );    
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql(`
        DROP TABLE IF EXISTS business.plans
    `);
};
