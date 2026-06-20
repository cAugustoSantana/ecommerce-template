import { storeConfig } from "@shared/store.config";

export function buildStoreWhatsAppUrl(text: string, digits?: string): string {
  const resolved =
    digits ??
    `${storeConfig.contact.whatsappCountryCode}${storeConfig.contact.whatsappNumber}`.replace(
      /\D/g,
      "",
    );
  return `https://wa.me/${resolved}?text=${encodeURIComponent(text)}`;
}

export function buildBuyerWhatsAppUrl(buyerPhoneDigits: string, text?: string): string {
  const base = `https://wa.me/${buyerPhoneDigits.replace(/\D/g, "")}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function buildPaymentProofWhatsAppMessage(params: {
  displayId: string;
  buyerName: string;
  totalFormatted: string;
  locale: "es" | "en";
}): string {
  const { displayId, buyerName, totalFormatted, locale } = params;
  if (locale === "en") {
    return [
      "Hello, I completed a bank transfer.",
      "",
      `Order: ${displayId}`,
      `Name: ${buyerName}`,
      `Total: ${totalFormatted}`,
      "",
      "I am attaching the payment proof.",
    ].join("\n");
  }
  return [
    "Hola, realicé una transferencia bancaria.",
    "",
    `Pedido: ${displayId}`,
    `Nombre: ${buyerName}`,
    `Total: ${totalFormatted}`,
    "",
    "Adjunto comprobante de pago.",
  ].join("\n");
}
