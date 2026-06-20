import { useTranslation } from "react-i18next";
import { buildBuyerWhatsAppUrl } from "@/lib/whatsapp";
import type { AdminOrderDetail } from "@/types/commerce";
import styles from "@/pages/admin/AdminOrderDetailPage.module.css";

export function CustomerCard({ buyer }: { buyer: AdminOrderDetail["buyer"] }) {
  const { t } = useTranslation();
  const whatsAppUrl = buildBuyerWhatsAppUrl(buyer.phone);

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>{t("admin.buyer")}</h2>
      <dl className={styles.detailList}>
        <div>
          <dt>{t("checkout.name")}</dt>
          <dd>{buyer.name}</dd>
        </div>
        <div>
          <dt>{t("checkout.phone")}</dt>
          <dd>
            <a href={whatsAppUrl} target="_blank" rel="noreferrer">
              {buyer.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt>{t("checkout.email")}</dt>
          <dd>
            <a href={`mailto:${buyer.email}`}>{buyer.email}</a>
          </dd>
        </div>
      </dl>
    </div>
  );
}
