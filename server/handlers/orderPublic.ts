import type { VercelRequest, VercelResponse } from "@vercel/node";
import { hasDatabase } from "../db.js";
import { getOrderByDisplayId } from "../orders.js";
import { getPaymentInstructions } from "../payments/index.js";
import { json, methodNotAllowed } from "../http.js";
import type { Locale } from "../../shared/types.js";

export async function handleOrderPublic(req: VercelRequest, res: VercelResponse) {
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

  const order = await getOrderByDisplayId(displayId);
  if (!order) {
    return json(res, 404, { error: "order_not_found" });
  }

  const locale = order.locale as Locale;
  const payment = await getPaymentInstructions(locale);

  return json(res, 200, {
    displayId: order.display_id,
    total: Number(order.total),
    locale: order.locale,
    estado: order.estado,
    createdAt: order.created_at,
    buyerName: order.buyer_name,
    buyerEmail: order.buyer_email,
    paymentProofMethod: order.payment_proof_method,
    hasProof: Boolean(order.payment_proof_url),
    shipping: {
      address: order.shipping_address,
      city: order.shipping_city,
      postalCode: order.shipping_postal_code,
    },
    items: order.items.map((item) => ({
      productId: item.product_id,
      productName: item.product_name,
      variants: item.variants,
      quantity: item.quantity,
      unitPrice: Number(item.unit_price),
      lineTotal: Number(item.unit_price) * item.quantity,
    })),
    payment,
  });
}
