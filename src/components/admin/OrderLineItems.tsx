import { useTranslation } from "react-i18next";
import type { AdminOrderDetail } from "@/types/commerce";
import type { Locale } from "@shared/types";
import { formatMoney } from "@/lib/format";
import styles from "@/pages/admin/AdminOrderDetailPage.module.css";

export function OrderLineItems({
  items,
  locale,
}: {
  items: AdminOrderDetail["items"];
  locale: Locale;
}) {
  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>{t("checkout.orderSummary")}</h2>
      <ul className={styles.lineItems}>
        {items.map((item) => {
          const lineTotal = item.unitPrice * item.quantity;
          const variantText = Object.entries(item.variants)
            .map(([k, v]) => `${k}: ${v}`)
            .join(" · ");

          return (
            <li key={`${item.productId}-${variantText}`} className={styles.lineItem}>
              {item.imageUrl && (
                <img src={item.imageUrl} alt="" className={styles.lineItemImg} />
              )}
              <div className={styles.lineItemBody}>
                <div className={styles.lineItemName}>{item.productName}</div>
                {variantText && (
                  <div className={styles.lineItemVariants}>{variantText}</div>
                )}
                <div className={styles.lineItemMeta}>
                  {item.quantity} × {formatMoney(item.unitPrice, locale)}
                </div>
              </div>
              <div className={styles.lineItemTotal}>{formatMoney(lineTotal, locale)}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
