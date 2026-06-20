import { useTranslation } from "react-i18next";
import type { OrderTimelineEvent } from "@/types/commerce";
import type { Locale } from "@shared/types";
import styles from "@/pages/admin/AdminOrderDetailPage.module.css";

const EVENT_KEYS: Record<OrderTimelineEvent["type"], string> = {
  order_placed: "admin.timeline.orderPlaced",
  proof_uploaded: "admin.timeline.proofUploaded",
  proof_whatsapp: "admin.timeline.proofWhatsApp",
  payment_confirmed: "admin.timeline.paymentConfirmed",
  status_updated: "admin.timeline.statusUpdated",
};

export function OrderTimeline({
  events,
  locale,
}: {
  events: OrderTimelineEvent[];
  locale: Locale;
}) {
  const { t } = useTranslation();

  return (
    <ul className={styles.timeline}>
      {events.map((event, index) => (
        <li key={`${event.type}-${event.at}-${index}`} className={styles.timelineItem}>
          <span className={styles.timelineDot} aria-hidden />
          <div>
            <div className={styles.timelineLabel}>{t(EVENT_KEYS[event.type])}</div>
            <div className={styles.timelineDate}>
              {new Date(event.at).toLocaleString(locale)}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
