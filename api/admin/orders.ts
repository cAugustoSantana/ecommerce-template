import type { VercelRequest, VercelResponse } from "@vercel/node";
import { hasDatabase } from "../lib/db.js";
import { requireAdmin } from "../lib/auth.js";
import { listOrdersWithItems } from "../lib/orders.js";
import { serializeAdminOrderListItem } from "../lib/adminOrders.js";
import { json, methodNotAllowed } from "../lib/http.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return methodNotAllowed(res);
  }

  if (!hasDatabase()) {
    return json(res, 503, { error: "database_not_configured" });
  }

  try {
    await requireAdmin(req);
    const orders = await listOrdersWithItems();

    return json(res, 200, {
      orders: orders.map(serializeAdminOrderListItem),
    });
  } catch (err) {
    if (err instanceof Error && err.message === "unauthorized") {
      return json(res, 401, { error: "unauthorized" });
    }
    console.error("admin_orders_error", err);
    return json(res, 500, { error: "server_error" });
  }
}
