export const DEMO_PREFIX = "/demo";

export const routes = {
  home: "/",
  demo: DEMO_PREFIX,
  demoProduct: (productId: string) => `${DEMO_PREFIX}/products/${encodeURIComponent(productId)}`,
  demoCheckout: `${DEMO_PREFIX}/checkout`,
  demoPayment: (displayId: string) =>
    `${DEMO_PREFIX}/order/payment/${encodeURIComponent(displayId)}`,
  admin: "/admin",
} as const;

export function isDemoPath(pathname: string): boolean {
  return pathname === DEMO_PREFIX || pathname.startsWith(`${DEMO_PREFIX}/`);
}

export function isLandingPath(pathname: string): boolean {
  return pathname === routes.home;
}
