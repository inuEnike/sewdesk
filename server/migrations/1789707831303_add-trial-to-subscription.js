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
        ALTER TABLE business.subscription
        DROP CONSTRAINT subscription_status_check;

        ALTER TABLE business.subscription
        ADD CONSTRAINT subscription_status_check
        CHECK (
            status IN (
                'pending',
                'trialing',
                'active',
                'expired',
                'cancelled'
            )
        );

        ALTER TABLE business.subscription
        ADD COLUMN trial_ends_at TIMESTAMPTZ;
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql(`
        ALTER TABLE business.subscription
        DROP COLUMN trial_ends_at;

        ALTER TABLE business.subscription
        DROP CONSTRAINT subscription_status_check;

        ALTER TABLE business.subscription
        ADD CONSTRAINT subscription_status_check
        CHECK (
            status IN (
                'pending',
                'active',
                'cancelled'
            )
        );
    `);
};
