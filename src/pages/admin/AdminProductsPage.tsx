import { Link, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { fetchAdminProducts } from "@/lib/api";
import { formatMoney } from "@/lib/format";
import type { Locale } from "@shared/types";
import type { Product } from "@shared/product.types";
import shared from "@/styles/shared.module.css";
import styles from "./admin.module.css";

type AdminOutletContext = { token: string };

export function AdminProductsPage() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;
  const { token } = useOutletContext<AdminOutletContext>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAdminProducts(token);
        if (!cancelled) setProducts(data.products);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <>
      <div className={styles.productsToolbar}>
        <header className={shared.pageHeader}>
          <h1>{t("admin.products.title")}</h1>
        </header>
        <Link to="/admin/products/new" className={shared.button}>
          {t("admin.products.add")}
        </Link>
      </div>

      {loading && <p>{t("common.loading")}</p>}
      {error && <p className={shared.error}>{error}</p>}

      {!loading && products.length === 0 ? (
        <p className={styles.empty}>{t("admin.products.empty")}</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t("admin.products.id")}</th>
                <th>{t("admin.products.name")}</th>
                <th>{t("admin.total")}</th>
                <th>{t("admin.products.active")}</th>
                <th aria-label={t("admin.viewDetails")} />
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name[locale] ?? product.name.es}</td>
                  <td>{formatMoney(product.price, locale)}</td>
                  <td>{product.active ? t("admin.products.yes") : t("admin.products.no")}</td>
                  <td>
                    <Link
                      className={styles.viewLink}
                      to={`/admin/products/${encodeURIComponent(product.id)}`}
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
