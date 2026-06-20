import type { VercelRequest, VercelResponse } from "@vercel/node";
import { hasDatabase } from "../db.js";
import { requireAdmin } from "../auth.js";
import { getOrderByDisplayId } from "../orders.js";
import { serializeAdminOrderDetail } from "../adminOrders.js";
import { json, methodNotAllowed } from "../http.js";

export async function handleAdminOrderDetail(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return methodNotAllowed(res);
  }

  if (!hasDatabase()) {
    return json(res, 503, { error: "database_not_configured" });
  }

  const displayId = req.query.displayId;
  if (typeof displayId !== "string" || !displayId.trim()) {
    return json(res, 400, { error: "missing_display_id" });
  }

  try {
    await requireAdmin(req);
    const order = await getOrderByDisplayId(displayId);
    if (!order) {
      return json(res, 404, { error: "order_not_found" });
    }

    return json(res, 200, { order: await serializeAdminOrderDetail(order) });
  } catch (err) {
    if (err instanceof Error && err.message === "unauthorized") {
      return json(res, 401, { error: "unauthorized" });
    }
    console.error("admin_order_detail_error", err);
    return json(res, 500, { error: "server_error" });
  }
}
