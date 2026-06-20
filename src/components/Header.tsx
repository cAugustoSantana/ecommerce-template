import { Link } from "react-router-dom";
import { routes } from "@shared/routes";
import { useTranslation } from "react-i18next";
import { storeConfig } from "@shared/store.config";
import { getLocalized } from "@/lib/localized";
import type { Locale } from "@shared/types";
import { LocaleSwitcher } from "./LocaleSwitcher";
import styles from "./Header.module.css";

export function Header() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to={routes.demo} className={styles.brand}>
          <img
            src={storeConfig.logoUrl}
            alt={getLocalized(storeConfig.storeName, locale)}
            className={styles.logo}
          />
          <div>
            <span className={styles.name}>
              {getLocalized(storeConfig.storeName, locale)}
            </span>
            <span className={styles.tagline}>
              {getLocalized(storeConfig.description, locale)}
            </span>
          </div>
        </Link>
        <nav className={styles.nav} aria-label="Main">
          <Link to={routes.demo}>{t("nav.store")}</Link>
          <Link to={routes.demoCheckout}>{t("nav.checkout")}</Link>
          <Link to="/admin">{t("nav.admin")}</Link>
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  );
}
