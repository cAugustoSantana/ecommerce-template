import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { getStorePrimaryColor } from "@/lib/storeRuntime";
import { Header } from "@/components/Header";
import { ProductsProvider } from "@/context/ProductsContext";
import { StoreSettingsProvider } from "@/context/StoreSettingsContext";
import { CartProvider } from "@/context/CartContext";
import { StorefrontPage } from "@/pages/StorefrontPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { PaymentPage } from "@/pages/PaymentPage";
import {
  AdminLayout,
  AdminIndexRedirect,
} from "@/pages/admin/AdminLayout";
import { AdminOrdersPage } from "@/pages/admin/AdminOrdersPage";
import { AdminOrderDetailPage } from "@/pages/admin/AdminOrderDetailPage";
import { AdminProductsPage } from "@/pages/admin/AdminProductsPage";
import { AdminProductFormPage } from "@/pages/admin/AdminProductFormPage";
import { AdminSettingsPage } from "@/pages/admin/AdminSettingsPage";
import { TemplateLandingPage } from "@/pages/TemplateLandingPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { isDemoPath, isLandingPath, routes } from "@shared/routes";
import styles from "./App.module.css";

function RedirectLegacyProduct() {
  const { productId } = useParams<{ productId: string }>();
  if (!productId) return <Navigate to={routes.demo} replace />;
  return <Navigate to={routes.demoProduct(productId)} replace />;
}

function RedirectLegacyPayment() {
  const { displayId } = useParams<{ displayId: string }>();
  if (!displayId) return <Navigate to={routes.demo} replace />;
  return <Navigate to={routes.demoPayment(displayId)} replace />;
}

function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isCheckoutRoute = location.pathname === routes.demoCheckout;
  const isPaymentRoute = location.pathname.startsWith(`${routes.demo}/order/payment`);
  const isStorefrontShell =
    isLandingPath(location.pathname) || isDemoPath(location.pathname);

  return (
    <div
      className={styles.app}
      style={{
        ["--color-primary" as string]: getStorePrimaryColor(),
        ["--color-accent" as string]: "#F5C518",
      }}
    >
      {!isAdminRoute &&
        !isCheckoutRoute &&
        !isPaymentRoute &&
        !isStorefrontShell && <Header />}
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<TemplateLandingPage />} />
          <Route path={routes.demo} element={<StorefrontPage />} />
          <Route path={`${routes.demo}/products/:productId`} element={<ProductDetailPage />} />
          <Route path={routes.demoCheckout} element={<CheckoutPage />} />
          <Route
            path={`${routes.demo}/order/payment/:displayId`}
            element={<PaymentPage />}
          />

          <Route path="/start-selling" element={<Navigate to="/" replace />} />
          <Route path="/products/:productId" element={<RedirectLegacyProduct />} />
          <Route path="/checkout" element={<Navigate to={routes.demoCheckout} replace />} />
          <Route path="/order/payment/:displayId" element={<RedirectLegacyPayment />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminIndexRedirect />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="orders/:displayId" element={<AdminOrderDetailPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="products/new" element={<AdminProductFormPage />} />
            <Route path="products/:productId" element={<AdminProductFormPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ProductsProvider>
      <StoreSettingsProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </StoreSettingsProvider>
    </ProductsProvider>
  );
}
