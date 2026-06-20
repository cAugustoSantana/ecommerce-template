import { useTranslation } from "react-i18next";
import { useProducts } from "@/context/ProductsContext";
import { useCart } from "@/context/CartContext";
import type { Locale } from "@shared/types";
import { ProductCard } from "@/components/ProductCard";
import { StorefrontHeader } from "@/components/StorefrontHeader";
import { CartDrawer } from "@/components/CartDrawer";
import { PendingOrderBanner } from "@/components/PendingOrderBanner";

export function StorefrontPage() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;
  const { products, loading, error } = useProducts();
  const { isDrawerOpen } = useCart();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50/50 font-sans text-gray-900 antialiased selection:bg-brand-100 selection:text-brand-900">
      <StorefrontHeader showAdminNav />
      <PendingOrderBanner />

      <main
        className={`mx-auto w-full max-w-[1440px] flex-grow px-6 py-10 lg:px-10 lg:py-14 ${
          isDrawerOpen ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <div className="mb-8 lg:mb-10">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl">
            {t("storefront.title")}
          </h1>
          <p className="text-base text-gray-500 lg:text-lg">{t("storefront.subtitle")}</p>
        </div>

        {loading && <p className="text-gray-500">{t("common.loading")}</p>}
        {error && <p className="font-medium text-red-600">{error}</p>}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </main>

      <CartDrawer />
    </div>
  );
}
