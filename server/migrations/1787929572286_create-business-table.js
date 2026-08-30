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
        CREATE TABLE IF NOT EXISTS business.businesses (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            business_name TEXT NOT NULL,
            address TEXT NOT NULL,
            business_phone VARCHAR(20) NOT NULL,
            whatsapp_number VARCHAR(20) NOT NULL,
            business_email TEXT NOT NULL UNIQUE,
            business_owner_id UUID REFERENCES auth.users(id) NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            status TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'active', 'suspended', 'cancelled')),
            description TEXT,
            plan TEXT NOT NULL 
                CHECK (plan IN ('sewdesk', 'sewdesk_pro')),
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
        DROP TABLE IF EXISTS business.businesses;
    `);
};
