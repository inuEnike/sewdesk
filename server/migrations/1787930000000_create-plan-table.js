export const shorthands = undefined;

export const up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS business.plans(
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(30) NOT NULL,
      description TEXT NOT NULL,
      price NUMERIC(12, 2) NOT NULL,
      period VARCHAR(20) NOT NULL,
      cta VARCHAR(50) NOT NULL,
      highlight BOOLEAN NOT NULL DEFAULT FALSE,
      badge VARCHAR(50),
      features JSONB NOT NULL DEFAULT '[]'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
};

export const down = (pgm) => {
  pgm.sql(`
    DROP TABLE IF EXISTS business.plans;
  `);
};
