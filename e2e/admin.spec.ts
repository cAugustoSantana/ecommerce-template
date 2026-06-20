import {
  test,
  expect,
  hasE2eDatabase,
  hasE2eBlob,
  completeCheckout,
  loginAdmin,
} from "./fixtures";
import path from "path";
import { writeProofPng } from "./helpers";

test.beforeEach(({ }, testInfo) => {
  if (!hasE2eDatabase()) testInfo.skip();
});

test.describe.configure({ mode: "serial" });

test("admin rejects wrong password", async ({ page }) => {
  await page.goto("/admin");
  await page.locator("#admin-password").fill("wrong-password");
  await page.getByRole("button", { name: /Iniciar sesión|Log in/i }).click();
  await expect(page.getByText(/Algo salió mal|Something went wrong/i)).toBeVisible();
});

test("admin login shows orders table", async ({ page }) => {
  await loginAdmin(page);
  await expect(page).toHaveURL(/\/admin\/orders$/);
  await expect(page.locator("table")).toBeVisible();
});

test("checkout order appears in admin with pending status", async ({ page }) => {
  const displayId = await completeCheckout(page);
  await loginAdmin(page);
  await expect(page.getByText(displayId)).toBeVisible();
  await expect(page.getByText(/Confirmación de pago pendiente|Payment confirmation pending/i)).toBeVisible();
});

test("admin confirms payment on detail page and persists status", async ({ page }) => {
  const displayId = await completeCheckout(page);

  await loginAdmin(page);
  await page.getByRole("link", { name: /Ver|View/i }).first().click();
  await expect(page).toHaveURL(new RegExp(`/admin/orders/${displayId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));

  await page.getByRole("button", { name: /Confirmar pago|Confirm payment/i }).first().click();
  await expect(page.getByText(/Confirmado|Confirmed/i).first()).toBeVisible();

  await page.reload();
  await expect(page.getByText(/Confirmado|Confirmed/i).first()).toBeVisible();
});

test("admin views uploaded proof on detail page", async ({ page }, testInfo) => {
  if (!hasE2eBlob()) {
    testInfo.skip(true, "BLOB_READ_WRITE_TOKEN not configured");
  }

  const displayId = await completeCheckout(page);
  const proofPath = path.join(import.meta.dirname, "fixtures", "proof.png");
  writeProofPng(proofPath);
  await page.locator('input[type="file"]').setInputFiles(proofPath);
  await expect(page.getByText(/Comprobante enviado|Proof submitted/i)).toBeVisible({
    timeout: 15_000,
  });

  await loginAdmin(page);
  await page.goto(`/admin/orders/${displayId}`);
  await page.getByRole("button", { name: /Ver comprobante|View proof/i }).first().click();
  await expect(page.locator("img").first()).toBeVisible({ timeout: 10_000 });
});

test("invalid displayId shows not found", async ({ page }) => {
  await loginAdmin(page);
  await page.goto("/admin/orders/MITIENDA-doesnotexist");
  await expect(page.getByText(/Pedido no encontrado|Order not found/i)).toBeVisible();
});

test("logout returns to login form", async ({ page }) => {
  await loginAdmin(page);
  await page.getByRole("button", { name: /Cerrar sesión|Log out/i }).click();
  await expect(page.getByRole("button", { name: /Iniciar sesión|Log in/i })).toBeVisible();
});

test("cleared token requires login again", async ({ page }) => {
  await loginAdmin(page);
  await page.evaluate(() => sessionStorage.removeItem("adminToken"));
  await page.reload();
  await expect(page.getByRole("button", { name: /Iniciar sesión|Log in/i })).toBeVisible();
});
