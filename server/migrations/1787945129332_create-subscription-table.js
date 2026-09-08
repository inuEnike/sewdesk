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
        CREATE TABLE IF NOT EXISTS business.subscription(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

            business_id UUID REFERENCES business.businesses(id) NOT NULL ON DELETE CASCADE,

            plan_id UUID REFERENCES business.plans(id) NOT NULL ON DELETE RESTRICT,
            
            status TEXT NOT NULL DEFAULT 'pending'     
                CHECK (status IN ('pending', 'active', 'cancelled')),
            
            started_at TIMESTAMPTZ,
            
            expires_at TIMESTAMPTZ,
            
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),  s
            
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
        DROP TABLE IF EXISTS business.subscription;
    `);
};
