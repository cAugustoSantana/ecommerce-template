import type { Locale } from "@shared/types";
import { getLocalized } from "@/lib/localized";
import type { useProducts } from "@/context/ProductsContext";

export function formatCartVariants(
  productId: string,
  variants: Record<string, string>,
  locale: Locale,
  getProduct: ReturnType<typeof useProducts>["getProduct"],
): string {
  const product = getProduct(productId);
  if (!product) return "";
  return Object.entries(variants)
    .map(([key, valueKey]) => {
      const group = product.variantOptions[key];
      const value = group?.values[valueKey];
      const label = group ? getLocalized(group.label, locale) : key;
      const valueLabel = value ? getLocalized(value, locale) : valueKey;
      return `${label}: ${valueLabel}`;
    })
    .join(" • ");
}

export function cartLineTileClass(index: number): string {
  const tiles = [
    "bg-blue-50 border-gray-100 text-brand-500",
    "bg-amber-50 border-gray-100 text-amber-500",
    "bg-emerald-50 border-gray-100 text-emerald-500",
  ];
  return tiles[index % tiles.length];
}
