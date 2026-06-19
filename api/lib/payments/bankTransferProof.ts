import type { Locale } from "../../../shared/types.js";
import { storeConfig } from "../config.js";
import { getBankTransferDetails } from "../email.js";

export type PaymentInstructions = {
  provider: typeof storeConfig.payment.provider;
  bankTransfer: ReturnType<typeof getBankTransferDetails>;
};

export function getPaymentInstructions(locale: Locale): PaymentInstructions {
  return {
    provider: storeConfig.payment.provider,
    bankTransfer: getBankTransferDetails(locale),
  };
}

export function assertPaymentProviderConfigured(provider: string): void {
  if (provider === "stripe" || provider === "azul") {
    throw new Error(`${provider}_not_configured`);
  }
}
