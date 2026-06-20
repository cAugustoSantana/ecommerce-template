import type { VercelRequest, VercelResponse } from "@vercel/node";
import { hasDatabase } from "../../lib/db.js";
import { requireAdmin } from "../../lib/auth.js";
import {
  deactivateProduct,
  getProductById,
  updateProduct,
} from "../../lib/products.js";
import { json, methodNotAllowed, readJsonBody } from "../../lib/http.js";

type UpdateProductBody = {
  name?: Record<string, string>;
  description?: Record<string, string>;
  price?: number;
  imageUrl?: string;
  variantOptions?: Record<string, unknown>;
  active?: boolean;
  sortOrder?: number;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!hasDatabase()) {
    return json(res, 503, { error: "database_not_configured" });
  }

  const id = req.query.id;
  if (typeof id !== "string" || !id.trim()) {
    return json(res, 400, { error: "missing_product_id" });
  }

  try {
    await requireAdmin(req);

    if (req.method === "GET") {
      const product = await getProductById(id);
      if (!product) {
        return json(res, 404, { error: "product_not_found" });
      }
      return json(res, 200, { product });
    }

    if (req.method === "PUT") {
      const body = readJsonBody<UpdateProductBody>(req);
      if (body.price != null && body.price < 0) {
        return json(res, 400, { error: "invalid_price" });
      }
      const product = await updateProduct(id, body);
      if (!product) {
        return json(res, 404, { error: "product_not_found" });
      }
      return json(res, 200, { product });
    }

    if (req.method === "DELETE") {
      const product = await deactivateProduct(id);
      if (!product) {
        return json(res, 404, { error: "product_not_found" });
      }
      return json(res, 200, { product });
    }

    return methodNotAllowed(res);
  } catch (err) {
    if (err instanceof Error && err.message === "unauthorized") {
      return json(res, 401, { error: "unauthorized" });
    }
    console.error("admin_product_error", err);
    return json(res, 500, { error: "server_error" });
  }
}
