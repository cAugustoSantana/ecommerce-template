-- Store settings (single-row JSON config edited from admin panel)
CREATE TABLE IF NOT EXISTS store_settings (
  id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  config JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE store_settings IS 'Single-row store metadata overrides; merged with shared/store.config.ts defaults';
