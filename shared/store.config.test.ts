import { describe, it, expect } from "vitest";
import { storeConfig } from "./store.config";

describe("storeConfig", () => {
  it("has payment_confirmation_pending default and bank transfer provider", () => {
    expect(storeConfig.defaultOrderStatus).toBe("payment_confirmation_pending");
    expect(storeConfig.payment.provider).toBe("bank_transfer_proof");
  });

  it("defines supported locales and order statuses", () => {
    expect(storeConfig.supportedLocales).toContain("es");
    expect(storeConfig.orderStatuses).toContain("confirmed");
  });
});
