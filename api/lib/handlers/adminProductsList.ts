import type { VercelRequest, VercelResponse } from "@vercel/node";
import { hasDatabase } from "../db.js";
import { requireAdmin } from "../auth.js";
import { createProduct, listAllProducts } from "../products.js";
import { json, methodNotAllowed, readJsonBody } from "../http.js";

type CreateProductBody = {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  price: number;
  imageUrl?: string;
  variantOptions?: Record<string, unknown>;
  active?: boolean;
  sortOrder?: number;
};

export async function handleAdminProductsList(req: VercelRequest, res: VercelResponse) {
  if (!hasDatabase()) {
    return json(res, 503, { error: "database_not_configured" });
  }

  try {
    await requireAdmin(req);

    if (req.method === "GET") {
      const products = await listAllProducts();
      return json(res, 200, { products });
    }

    if (req.method === "POST") {
      const body = readJsonBody<CreateProductBody>(req);
      if (!body.id?.trim() || !body.name || !body.description || body.price == null) {
        return json(res, 400, { error: "invalid_request" });
      }
      if (body.price < 0) {
        return json(res, 400, { error: "invalid_price" });
      }

      const product = await createProduct({
        id: body.id.trim(),
        name: body.name,
        description: body.description,
        price: body.price,
        imageUrl: body.imageUrl?.trim() || "/products/placeholder.svg",
        variantOptions: body.variantOptions ?? {},
        active: body.active,
        sortOrder: body.sortOrder,
      });
      return json(res, 201, { product });
    }

    return methodNotAllowed(res);
  } catch (err) {
    if (err instanceof Error && err.message === "unauthorized") {
      return json(res, 401, { error: "unauthorized" });
    }
    const code = (err as { code?: string })?.code;
    if (code === "23505") {
      return json(res, 409, { error: "product_exists" });
    }
    console.error("admin_products_error", err);
    return json(res, 500, { error: "server_error" });
  }
}
