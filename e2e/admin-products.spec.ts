import {
  test,
  expect,
  hasE2eDatabase,
  hasE2eBlob,
  loginAdmin,
  gotoStorefront,
  uniqueEmail,
} from "./fixtures";
import path from "path";
import { writeProofPng } from "./helpers";

test.beforeEach(({ }, testInfo) => {
  if (!hasE2eDatabase()) testInfo.skip();
});

test.describe.configure({ mode: "serial" });

test("admin creates product and it appears on storefront", async ({ page }, testInfo) => {
  if (!hasE2eBlob()) {
    testInfo.skip(true, "BLOB_READ_WRITE_TOKEN not configured");
  }

  const productId = `prod-e2e-${Date.now()}`;
  const productNameEs = `Producto E2E ${Date.now()}`;

  await loginAdmin(page);
  await page.goto("/admin/products/new");
  await page.locator("#product-id").fill(productId);
  await page.locator("#name-es").fill(productNameEs);
  await page.locator("#name-en").fill("E2E Product");
  await page.locator("#desc-es").fill("Descripción de prueba");
  await page.locator("#desc-en").fill("Test description");
  await page.locator("#price").fill("777");

  const proofPath = path.join(import.meta.dirname, "fixtures", "proof.png");
  writeProofPng(proofPath);
  await page.locator("#image").setInputFiles(proofPath);

  await page.getByRole("button", { name: /Guardar producto|Save product/i }).click();
  await expect(page).toHaveURL(/\/admin\/products$/);

  await gotoStorefront(page);
  await expect(page.getByRole("heading", { name: productNameEs })).toBeVisible();

  await page.getByRole("button", { name: /Agregar al pedido|Add to order/i }).last().click();
  await page.getByRole("link", { name: /Ir al checkout|Go to checkout/i }).click();
  await page.locator("#checkout-name").fill("E2E Product Buyer");
  await page.locator("#checkout-phone").fill("+1 849 620 2020");
  await page.locator("#checkout-email").fill(uniqueEmail());
  await page.getByRole("button", { name: /Finalizar pedido|Place order/i }).click();
  await page.waitForURL(/\/order\/payment\/MITIENDA-[a-f0-9]+/i);
});
