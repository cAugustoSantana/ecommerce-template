-- Products catalog (Phase 2)
-- Run after schema.sql on existing branches, or use full schema.sql for greenfield.

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name JSONB NOT NULL,
  description JSONB NOT NULL,
  price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
  image_url TEXT NOT NULL,
  variant_options JSONB NOT NULL DEFAULT '{}'::jsonb,
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT products_id_not_empty CHECK (char_length(trim(id)) > 0)
);

CREATE INDEX IF NOT EXISTS products_active_sort_idx ON products (active, sort_order, id);

COMMENT ON TABLE products IS 'Store catalog; name/description are localized JSONB { es, en }';
COMMENT ON COLUMN products.variant_options IS 'Variant groups JSON matching shared Product.variantOptions shape';
