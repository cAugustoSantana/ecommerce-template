import type { ProductRow } from "../shared/db.types.js";
import type { Product, VariantGroup } from "../shared/product.types.js";
import { getSql } from "./db.js";

function parseJsonField<T>(value: T | string): T {
  return typeof value === "string" ? (JSON.parse(value) as T) : value;
}

export function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: parseJsonField(row.name),
    description: parseJsonField(row.description),
    price: Number(row.price),
    imageUrl: row.image_url,
    variantOptions: parseJsonField(row.variant_options) as Record<string, VariantGroup>,
    active: row.active,
    sortOrder: row.sort_order,
  };
}

export async function listActiveProducts(): Promise<Product[]> {
  const sql = getSql();
  const rows = (await sql`
    SELECT * FROM products
    WHERE active = true
    ORDER BY sort_order ASC, id ASC
  `) as ProductRow[];
  return rows.map(rowToProduct);
}

export async function listAllProducts(): Promise<Product[]> {
  const sql = getSql();
  const rows = (await sql`
    SELECT * FROM products
    ORDER BY sort_order ASC, id ASC
  `) as ProductRow[];
  return rows.map(rowToProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const sql = getSql();
  const rows = (await sql`
    SELECT * FROM products WHERE id = ${id} LIMIT 1
  `) as ProductRow[];
  const row = rows[0];
  return row ? rowToProduct(row) : null;
}

export async function getProductImageUrl(id: string): Promise<string | null> {
  const product = await getProductById(id);
  return product?.imageUrl ?? null;
}

export type ProductInput = {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  price: number;
  imageUrl: string;
  variantOptions: Record<string, unknown>;
  active?: boolean;
  sortOrder?: number;
};

export async function createProduct(input: ProductInput): Promise<Product> {
  const sql = getSql();
  const rows = (await sql`
    INSERT INTO products (
      id, name, description, price, image_url, variant_options, active, sort_order
    ) VALUES (
      ${input.id},
      ${JSON.stringify(input.name)}::jsonb,
      ${JSON.stringify(input.description)}::jsonb,
      ${input.price},
      ${input.imageUrl},
      ${JSON.stringify(input.variantOptions)}::jsonb,
      ${input.active ?? true},
      ${input.sortOrder ?? 0}
    )
    RETURNING *
  `) as ProductRow[];
  return rowToProduct(rows[0]!);
}

export async function updateProduct(id: string, input: Partial<ProductInput>): Promise<Product | null> {
  const existing = await getProductById(id);
  if (!existing) return null;

  const sql = getSql();
  const rows = (await sql`
    UPDATE products SET
      name = ${JSON.stringify(input.name ?? existing.name)}::jsonb,
      description = ${JSON.stringify(input.description ?? existing.description)}::jsonb,
      price = ${input.price ?? existing.price},
      image_url = ${input.imageUrl ?? existing.imageUrl},
      variant_options = ${JSON.stringify(input.variantOptions ?? existing.variantOptions)}::jsonb,
      active = ${input.active ?? existing.active ?? true},
      sort_order = ${input.sortOrder ?? existing.sortOrder ?? 0},
      updated_at = now()
    WHERE id = ${id}
    RETURNING *
  `) as ProductRow[];
  return rows[0] ? rowToProduct(rows[0]) : null;
}

export async function deactivateProduct(id: string): Promise<Product | null> {
  const sql = getSql();
  const rows = (await sql`
    UPDATE products SET active = false, updated_at = now()
    WHERE id = ${id}
    RETURNING *
  `) as ProductRow[];
  return rows[0] ? rowToProduct(rows[0]) : null;
}

export async function updateProductImageUrl(id: string, imageUrl: string): Promise<Product | null> {
  const sql = getSql();
  const rows = (await sql`
    UPDATE products SET image_url = ${imageUrl}, updated_at = now()
    WHERE id = ${id}
    RETURNING *
  `) as ProductRow[];
  return rows[0] ? rowToProduct(rows[0]) : null;
}
