import { Link, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useOrdersPoll } from "@/hooks/useOrdersPoll";
import { StatusBadge } from "@/components/StatusBadge";
import { formatMoney } from "@/lib/format";
import type { Locale } from "@shared/types";
import shared from "@/styles/shared.module.css";
import styles from "./admin.module.css";

type AdminOutletContext = { token: string };

export function AdminOrdersPage() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;
  const { token } = useOutletContext<AdminOutletContext>();
  const { orders, loading, error } = useOrdersPoll(token);

  return (
    <>
      <header className={shared.pageHeader}>
        <h1>{t("admin.orders")}</h1>
      </header>

      {loading && orders.length === 0 && <p>{t("common.loading")}</p>}
      {error && <p className={shared.error}>{error}</p>}

      {orders.length === 0 && !loading ? (
        <p className={styles.empty}>{t("admin.noOrders")}</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t("admin.orderId")}</th>
                <th>{t("admin.date")}</th>
                <th>{t("admin.buyer")}</th>
                <th>{t("admin.status")}</th>
                <th>{t("admin.total")}</th>
                <th aria-label={t("admin.viewDetails")} />
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.displayId}</td>
                  <td>{new Date(order.createdAt).toLocaleString(locale)}</td>
                  <td>{order.buyer.name}</td>
                  <td>
                    <StatusBadge status={order.estado} />
                  </td>
                  <td>{formatMoney(order.total, locale)}</td>
                  <td>
                    <Link
                      className={styles.viewLink}
                      to={`/admin/orders/${encodeURIComponent(order.displayId)}`}
                    >
                      {t("admin.viewDetails")}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
