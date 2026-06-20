import type { OrderWithItems } from "../../shared/db.types.js";

export type OrderTimelineEventType =
  | "order_placed"
  | "proof_uploaded"
  | "proof_whatsapp"
  | "payment_confirmed"
  | "status_updated";

export type OrderTimelineEvent = {
  type: OrderTimelineEventType;
  at: string;
};

export function buildOrderTimeline(order: OrderWithItems): OrderTimelineEvent[] {
  const events: OrderTimelineEvent[] = [
    { type: "order_placed", at: order.created_at },
  ];

  if (order.payment_proof_method === "upload" && order.payment_proof_url) {
    events.push({ type: "proof_uploaded", at: order.created_at });
  } else if (order.payment_proof_method === "whatsapp") {
    events.push({ type: "proof_whatsapp", at: order.created_at });
  }

  if (order.payment_verified_at) {
    events.push({ type: "payment_confirmed", at: order.payment_verified_at });
  } else if (order.estado === "confirmed") {
    events.push({ type: "payment_confirmed", at: order.created_at });
  }

  if (
    order.estado !== "payment_confirmation_pending" &&
    order.estado !== "confirmed"
  ) {
    events.push({ type: "status_updated", at: order.created_at });
  }

  return events;
}
