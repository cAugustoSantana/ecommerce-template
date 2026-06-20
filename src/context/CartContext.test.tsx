import { describe, it, expect, beforeAll } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { ProductsProvider } from "./ProductsContext";
import { CartProvider, useCart } from "./CartContext";
import { mockProductsFetch } from "@/test/mockProducts";

beforeAll(() => {
  mockProductsFetch();
});

function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <ProductsProvider>
      <CartProvider>{children}</CartProvider>
    </ProductsProvider>
  );
}

describe("CartContext", () => {
  it("adds lines and computes total", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    await waitFor(() => expect(result.current.total).toBe(0));
    act(() => {
      result.current.addLine({
        productId: "prod-1",
        variants: { size: "m", color: "black" },
        quantity: 2,
      });
    });
    expect(result.current.lines).toHaveLength(1);
    expect(result.current.total).toBe(3000);
  });

  it("merges duplicate variant lines", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const line = {
      productId: "prod-2",
      variants: { color: "navy" },
      quantity: 1,
    };
    act(() => {
      result.current.addLine(line);
      result.current.addLine(line);
    });
    expect(result.current.lines).toHaveLength(1);
    expect(result.current.lines[0].quantity).toBe(2);
    await waitFor(() => expect(result.current.total).toBe(1800));
  });

  it("removes a line and clears cart", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addLine({
        productId: "prod-2",
        variants: { color: "black" },
        quantity: 1,
      });
    });
    const lineId = result.current.lines[0].lineId;
    act(() => {
      result.current.removeLine(lineId);
    });
    expect(result.current.lines).toHaveLength(0);
    act(() => {
      result.current.addLine({
        productId: "prod-2",
        variants: { color: "black" },
        quantity: 1,
      });
      result.current.clearCart();
    });
    expect(result.current.lines).toHaveLength(0);
    expect(result.current.total).toBe(0);
  });
});
