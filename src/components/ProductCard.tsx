import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Product } from "@shared/product.types";
import type { Locale } from "@shared/types";
import { getLocalized } from "@/lib/localized";
import { formatMoney } from "@/lib/format";

type Props = {
  product: Product;
  locale: Locale;
};

export function ProductCard({ product, locale }: Props) {
  const { t } = useTranslation();
  const name = getLocalized(product.name, locale);

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
        <img
          src={product.imageUrl}
          alt={name}
          className="relative z-10 max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-grow flex-col p-6">
        <h2 className="mb-1 text-xl font-bold text-gray-900 group-hover:text-brand-600">{name}</h2>
        <p className="text-2xl font-extrabold text-gray-900">{formatMoney(product.price, locale)}</p>
        <span className="mt-4 text-sm font-semibold text-brand-600 group-hover:underline">
          {t("productDetail.viewProduct")} →
        </span>
      </div>
    </Link>
  );
}
