import type { VercelRequest, VercelResponse } from "@vercel/node";
import { hasDatabase } from "../db.js";
import { listActiveProducts } from "../products.js";
import { json, methodNotAllowed } from "../http.js";

export async function handleProductsList(req: VercelRequest, res: VercelResponse) {
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
