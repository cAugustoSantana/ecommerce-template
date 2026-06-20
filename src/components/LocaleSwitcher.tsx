import { useTranslation } from "react-i18next";
import { useStoreConfig } from "@/context/StoreSettingsContext";
import type { Locale } from "@shared/types";
import { setAppLocale } from "@/i18n";
import styles from "./LocaleSwitcher.module.css";

export function LocaleSwitcher() {
  const { t, i18n } = useTranslation();
  const settings = useStoreConfig();
  const current = i18n.language as Locale;

  return (
    <div className={styles.switcher} role="group" aria-label={t("locale.switchTo")}>
      {settings.supportedLocales.map((locale) => (
        <button
          key={locale}
          type="button"
          className={current === locale ? styles.active : styles.button}
          aria-pressed={current === locale}
          onClick={() => setAppLocale(locale)}
        >
          {t(`locale.${locale}`)}
        </button>
      ))}
    </div>
  );
}
