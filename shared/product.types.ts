import type { Locale } from "./types";

export type LocalizedField = Record<Locale, string>;

export type VariantValue = Record<Locale, string>;

export type VariantGroup = {
  label: LocalizedField;
  values: Record<string, VariantValue>;
};

export type Product = {
  id: string;
  name: LocalizedField;
  description: LocalizedField;
  price: number;
  imageUrl: string;
  variantOptions: Record<string, VariantGroup>;
  active?: boolean;
  sortOrder?: number;
};
