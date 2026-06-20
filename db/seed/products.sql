-- Demo products (matches former shared/store.config.ts catalog)
-- Run on dev / ci branches after 002_products.sql

INSERT INTO products (id, name, description, price, image_url, variant_options, active, sort_order)
VALUES
  (
    'prod-1',
    '{"es": "Camiseta Básica", "en": "Basic T-shirt"}'::jsonb,
    '{"es": "Algodón suave, corte regular", "en": "Soft cotton, regular fit"}'::jsonb,
    1500,
    '/products/prod-1.svg',
    '{
      "size": {
        "label": {"es": "Talla", "en": "Size"},
        "values": {
          "s": {"es": "S", "en": "S"},
          "m": {"es": "M", "en": "M"},
          "l": {"es": "L", "en": "L"},
          "xl": {"es": "XL", "en": "XL"}
        }
      },
      "color": {
        "label": {"es": "Color", "en": "Color"},
        "values": {
          "black": {"es": "Negro", "en": "Black"},
          "white": {"es": "Blanco", "en": "White"}
        }
      }
    }'::jsonb,
    true,
    0
  ),
  (
    'prod-2',
    '{"es": "Gorra Logo", "en": "Logo Cap"}'::jsonb,
    '{"es": "Gorra ajustable con logo bordado", "en": "Adjustable cap with embroidered logo"}'::jsonb,
    900,
    '/products/prod-2.svg',
    '{
      "color": {
        "label": {"es": "Color", "en": "Color"},
        "values": {
          "navy": {"es": "Azul marino", "en": "Navy"},
          "black": {"es": "Negro", "en": "Black"}
        }
      }
    }'::jsonb,
    true,
    1
  )
ON CONFLICT (id) DO NOTHING;
