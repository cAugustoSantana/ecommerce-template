import type { Locale } from "../../../shared/types.js";
import { getPaymentInstructions } from "./bankTransferProof.js";

export { getPaymentInstructions, assertPaymentProviderConfigured } from "./bankTransferProof.js";

export function getPaymentProvider() {
  return {
    getInstructions: (locale: Locale) => getPaymentInstructions(locale),
  };
}
