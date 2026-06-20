import type { VercelRequest, VercelResponse } from "@vercel/node";
import { hasDatabase } from "../lib/db.js";
import { listActiveProducts } from "../lib/products.js";
import { json, methodNotAllowed } from "../lib/http.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return methodNotAllowed(res);
  }

  if (!hasDatabase()) {
    return json(res, 503, { error: "database_not_configured" });
  }

  try {
    const products = await listActiveProducts();
    return json(res, 200, { products });
  } catch (err) {
    console.error("products_list_error", err);
    return json(res, 500, { error: "server_error" });
  }
}
