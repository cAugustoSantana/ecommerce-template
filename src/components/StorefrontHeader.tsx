import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Storefront } from "@phosphor-icons/react";
import { storeConfig } from "@shared/store.config";
import { getLocalized } from "@/lib/localized";
import type { Locale } from "@shared/types";

type Props = {
  showCatalogNav?: boolean;
  showAdminNav?: boolean;
};

export function StorefrontHeader({ showCatalogNav = true, showAdminNav = false }: Props) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white shadow-sm shadow-gray-100/50 print:hidden">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-500/20">
            <Storefront size={20} weight="fill" aria-hidden />
          </div>
          <div>
            <div className="text-xl font-bold leading-tight tracking-tight text-gray-900">
              {getLocalized(storeConfig.storeName, locale)}
            </div>
            <div className="text-sm font-medium text-gray-500">
              {getLocalized(storeConfig.description, locale)}
            </div>
          </div>
        </Link>

        {(showCatalogNav || showAdminNav) && (
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {showCatalogNav && (
              <Link
                to="/"
                className="rounded-lg px-4 py-2 font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                {t("storefront.title")}
              </Link>
            )}
            {showAdminNav && (
              <Link
                to="/admin"
                className="rounded-lg px-4 py-2 font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                {t("nav.admin")}
              </Link>
            )}
          </nav>
        )}

        <div
          className="flex items-center rounded-lg border border-gray-200/50 bg-gray-100/80 p-1"
          role="group"
          aria-label={t("locale.switchTo")}
        >
          {storeConfig.supportedLocales.map((l) => {
            const active = l === locale;
            return (
              <button
                key={l}
                type="button"
                className={
                  active
                    ? "rounded-md border border-gray-200/50 bg-white px-3 py-1.5 text-sm font-semibold text-brand-600 shadow-sm"
                    : "rounded-md px-3 py-1.5 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
                }
                aria-pressed={active}
                onClick={() => i18n.changeLanguage(l)}
              >
                {t(`locale.${l}`)}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
