import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Storefront } from "@phosphor-icons/react";
import { useStoreConfig } from "@/context/StoreSettingsContext";
import { getLocalized } from "@/lib/localized";
import type { Locale } from "@shared/types";

export function StorefrontFooter() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;
  const year = new Date().getFullYear();
  const settings = useStoreConfig();

  return (
    <footer className="mt-auto shrink-0 border-t border-gray-200/80 bg-white print:hidden">
      <section className="border-b border-brand-500/20 bg-gradient-to-br from-brand-600 via-brand-600 to-brand-700 text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-4 py-5 text-center md:flex-row md:justify-between md:text-left lg:px-8 lg:py-6">
          <div className="max-w-xl">
            <p className="text-base font-bold tracking-tight lg:text-lg">
              {t("footer.template.title")}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-brand-100">
              {t("footer.template.subtitle")}
            </p>
          </div>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-brand-700 shadow-lg shadow-brand-900/20 transition-transform hover:-translate-y-0.5 hover:bg-brand-50"
          >
            {t("footer.template.cta")}
            <ArrowRight size={16} weight="bold" aria-hidden />
          </a>
        </div>
      </section>

      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-4 py-5 md:flex-row lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
            <Storefront size={18} weight="fill" aria-hidden />
          </div>
          <span className="text-sm font-bold text-gray-500">
            {getLocalized(settings.storeName, locale)} © {year}
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs font-semibold text-gray-400 md:text-sm">
          <Link to="/admin" className="transition-colors hover:text-gray-600">
            {t("nav.admin")}
          </Link>
          <span>{t("productDetail.termsOfService")}</span>
          <span>{t("productDetail.shippingPolicy")}</span>
          <span>{t("productDetail.contactSupport")}</span>
        </div>
      </div>
    </footer>
  );
}
