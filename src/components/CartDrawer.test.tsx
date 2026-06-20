import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { CartProvider, useCart } from "@/context/CartContext";
import { ProductsProvider } from "@/context/ProductsContext";
import { mockProductsFetch } from "@/test/mockProducts";
import "@/i18n";

beforeAll(() => {
  mockProductsFetch();
});

function CartHarness() {
  const { addLine } = useCart();
  return (
    <>
      <button
        type="button"
        onClick={() =>
          addLine({
            productId: "prod-1",
            variants: { size: "l", color: "black" },
            quantity: 1,
          })
        }
      >
        Add test item
      </button>
      <CartDrawer />
    </>
  );
}

describe("CartDrawer", () => {
  it("opens with subtotal, tax, and checkout link", async () => {
    render(
      <MemoryRouter>
        <ProductsProvider>
          <CartProvider>
            <CartHarness />
          </CartProvider>
        </ProductsProvider>
      </MemoryRouter>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Add test item/i }));

    expect(screen.getByRole("dialog", { name: /Your order|Tu pedido/i })).toBeInTheDocument();
    expect(screen.getByText(/Subtotal/i)).toBeInTheDocument();
    expect(screen.getByText(/Tax|Impuesto/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Proceed to checkout|Ir al checkout/i }),
    ).toBeInTheDocument();
  });
});
