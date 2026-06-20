import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import i18n from "@/i18n";
import { ProductsProvider } from "@/context/ProductsContext";
import { StoreSettingsProvider } from "@/context/StoreSettingsContext";
import { CartProvider } from "@/context/CartContext";
import { mockProductsFetch } from "@/test/mockProducts";

type Options = RenderOptions & { route?: string };

mockProductsFetch();

export function renderWithProviders(ui: ReactElement, options: Options = {}) {
  const { route = "/", ...renderOptions } = options;
  return render(
    <I18nextProvider i18n={i18n}>
      <StoreSettingsProvider>
        <ProductsProvider>
          <CartProvider>
            <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
          </CartProvider>
        </ProductsProvider>
      </StoreSettingsProvider>
    </I18nextProvider>,
    renderOptions,
  );
}
