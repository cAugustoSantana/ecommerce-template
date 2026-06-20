import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import { mockProducts } from "@/test/mockProducts";
import type { Product } from "@shared/product.types";
import { ProductCard } from "./ProductCard";
import { renderWithProviders } from "@/test/render";

describe("ProductCard", () => {
  it("renders product name and links to detail page", () => {
    const product = mockProducts[0] as Product;
    renderWithProviders(
      <Routes>
        <Route path="/" element={<ProductCard product={product} locale="es" />} />
      </Routes>,
      { route: "/" },
    );

    expect(screen.getByRole("heading", { name: /Camiseta|Basic/i })).toBeInTheDocument();
    expect(screen.getByText(/1\.500|1,500/)).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /Camiseta|Basic/i });
    expect(link).toHaveAttribute("href", "/products/prod-1");
  });
});
