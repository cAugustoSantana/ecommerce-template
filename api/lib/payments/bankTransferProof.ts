import type { Locale } from "../../../shared/types.js";
import { getStoreConfig } from "../storeSettings.js";
import { getBankTransferDetails } from "../email.js";

export type PaymentInstructions = {
  provider: "bank_transfer_proof" | "stripe" | "azul";
  bankTransfer: ReturnType<typeof getBankTransferDetails>;
};

export async function getPaymentInstructions(locale: Locale): Promise<PaymentInstructions> {
  const config = await getStoreConfig();
  return {
    provider: config.payment.provider,
    bankTransfer: getBankTransferDetails(locale, config),
  };
}

export function assertPaymentProviderConfigured(provider: string): void {
  if (provider === "stripe" || provider === "azul") {
    throw new Error(`${provider}_not_configured`);
  }
}
