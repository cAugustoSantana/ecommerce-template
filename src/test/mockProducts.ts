import { vi } from "vitest";
import type { Product } from "@shared/product.types";

export const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: { es: "Camiseta Básica", en: "Basic T-shirt" },
    description: {
      es: "Algodón suave, corte regular",
      en: "Soft cotton, regular fit",
    },
    price: 1500,
    imageUrl: "/products/prod-1.svg",
    variantOptions: {
      size: {
        label: { es: "Talla", en: "Size" },
        values: {
          s: { es: "S", en: "S" },
          m: { es: "M", en: "M" },
          l: { es: "L", en: "L" },
          xl: { es: "XL", en: "XL" },
        },
      },
      color: {
        label: { es: "Color", en: "Color" },
        values: {
          black: { es: "Negro", en: "Black" },
          white: { es: "Blanco", en: "White" },
        },
      },
    },
    active: true,
    sortOrder: 0,
  },
  {
    id: "prod-2",
    name: { es: "Gorra Logo", en: "Logo Cap" },
    description: {
      es: "Gorra ajustable con logo bordado",
      en: "Adjustable cap with embroidered logo",
    },
    price: 900,
    imageUrl: "/products/prod-2.svg",
    variantOptions: {
      color: {
        label: { es: "Color", en: "Color" },
        values: {
          navy: { es: "Azul marino", en: "Navy" },
          black: { es: "Negro", en: "Black" },
        },
      },
    },
    active: true,
    sortOrder: 1,
  },
];

export function mockProductsFetch() {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo) => {
      const url = String(input);
      if (url.includes("/api/products")) {
        return new Response(JSON.stringify({ products: mockProducts }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      throw new Error(`Unmocked fetch: ${url}`);
    }),
  );
}
