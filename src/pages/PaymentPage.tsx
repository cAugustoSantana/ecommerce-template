import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Bank,
  Check,
  MapPin,
  Package,
  Printer,
  TShirt,
} from "@phosphor-icons/react";
import { fetchPublicOrder } from "@/lib/api";
import { useActiveOrder } from "@/hooks/useActiveOrder";
import { ProofUpload } from "@/components/ProofUpload";
import { WhatsAppProofButton } from "@/components/WhatsAppProofButton";
import { StorefrontHeader } from "@/components/StorefrontHeader";
import { formatMoney } from "@/lib/format";
import type { PublicOrder } from "@/types/commerce";
import type { Locale } from "@shared/types";

const ITEM_TILES = [
  "bg-brand-50 border-brand-100 text-brand-500/40",
  "bg-amber-50 border-amber-100 text-amber-500/40",
  "bg-emerald-50 border-emerald-100 text-emerald-500/40",
] as const;

function formatVariantLabel(key: string, value: string): string {
  const label = key.charAt(0).toUpperCase() + key.slice(1);
  const val = value.charAt(0).toUpperCase() + value.slice(1);
  return `${label}: ${val}`;
}

function variantDotClass(key: string, value: string): string {
  if (key === "color") {
    const v = value.toLowerCase();
    if (v.includes("black")) return "bg-black";
    if (v.includes("navy") || v.includes("blue")) return "bg-blue-900";
    if (v.includes("white")) return "bg-white border border-gray-300";
  }
  return "bg-gray-300";
}

export function PaymentPage() {
  const { displayId } = useParams<{ displayId: string }>();
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;
  const { setActiveOrder } = useActiveOrder();
  const [order, setOrder] = useState<PublicOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!displayId) return;
    setLoading(true);
    setError(null);
    try {
      const data = (await fetchPublicOrder(displayId)) as PublicOrder;
      setOrder(data);
      setActiveOrder(displayId);
    } catch {
      setError(t("common.error"));
    } finally {
      setLoading(false);
    }
  }, [displayId, setActiveOrder, t]);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50/50 font-sans text-gray-900">
        <p className="text-gray-500">{t("common.loading")}</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900">
        <StorefrontHeader />
        <main className="mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="font-medium text-red-600">{error ?? t("common.error")}</p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-xl bg-brand-600 px-10 py-4 font-bold text-white hover:bg-brand-700"
          >
            {t("common.continueShopping")}
          </Link>
        </main>
      </div>
    );
  }

  const bt = order.payment.bankTransfer;
  const totalFormatted = formatMoney(order.total, locale);
  const subtotal = order.items.reduce((sum, item) => sum + item.lineTotal, 0);
  const proofSubmitted =
    order.hasProof || order.paymentProofMethod === "whatsapp";
  const canUpload =
    order.estado === "payment_confirmation_pending" && !proofSubmitted;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50/50 font-sans text-gray-900 antialiased selection:bg-brand-100 selection:text-brand-900">
      <StorefrontHeader />

      <main className="mx-auto flex w-full max-w-[1440px] flex-grow flex-col items-center px-6 py-10 lg:px-10 lg:py-16">
        <div className="w-full max-w-3xl">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-green-100 bg-green-50 text-green-600 shadow-sm">
              <Check size={40} weight="bold" aria-hidden />
            </div>
            <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl">
              {t("payment.confirmedTitle")}
            </h1>
            <p className="text-lg text-gray-500">{t("payment.confirmedSubtitle")}</p>
            <div className="mt-6 inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-600">
              {t("payment.orderNumber", { displayId: order.displayId }).toUpperCase()}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50/30 p-8">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <Package size={22} weight="fill" className="text-brand-600" aria-hidden />
                {t("payment.orderSummary")}
              </h2>
            </div>

            <div className="divide-y divide-gray-100">
              {order.items.map((item, index) => {
                const tile = ITEM_TILES[index % ITEM_TILES.length];
                const Icon = index % 2 === 0 ? TShirt : Package;
                return (
                  <div key={`${item.productId}-${index}`} className="flex items-center gap-6 p-8">
                    <div
                      className={`flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl border ${tile}`}
                    >
                      <Icon size={40} weight="fill" className="opacity-40" aria-hidden />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-900">{item.productName}</h3>
                      <div className="mt-2 flex flex-wrap gap-4">
                        {Object.entries(item.variants).map(([key, value]) => (
                          <span
                            key={key}
                            className="flex items-center gap-1.5 text-sm font-medium text-gray-500"
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${variantDotClass(key, value)}`}
                              aria-hidden
                            />
                            {formatVariantLabel(key, value)}
                          </span>
                        ))}
                        <span className="flex items-center gap-1.5 text-sm font-medium text-gray-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-300" aria-hidden />
                          {t("storefront.quantity")}: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        {formatMoney(item.lineTotal, locale)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-100 bg-gray-50/50 p-8">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span className="font-medium">{t("payment.subtotal")}</span>
                  <span>{formatMoney(subtotal, locale)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="font-medium">{t("payment.shipping")}</span>
                  <span className="font-semibold text-green-600">
                    {t("payment.shippingFree")}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                  <span className="text-lg font-bold text-gray-900">
                    {t("payment.totalAmount")}
                  </span>
                  <span className="text-3xl font-black tracking-tight text-gray-900">
                    {formatMoney(order.total, locale)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <MapPin size={24} weight="bold" aria-hidden />
              </div>
              <div>
                <h3 className="mb-1 font-bold text-gray-900">{t("payment.shippingAddress")}</h3>
                <p className="text-sm font-medium leading-relaxed text-gray-500">
                  {order.shipping.address}
                  <br />
                  {order.shipping.city}, {order.shipping.postalCode}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Bank size={24} weight="bold" aria-hidden />
              </div>
              <div className="min-w-0 flex-grow">
                <h3 className="mb-1 font-bold text-gray-900">{t("payment.bankDetails")}</h3>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="font-medium text-gray-500">{t("payment.bankName")}</dt>
                    <dd className="font-semibold text-gray-900">{bt.bankName}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="font-medium text-gray-500">{t("payment.accountName")}</dt>
                    <dd className="font-semibold text-gray-900">{bt.accountName}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="font-medium text-gray-500">{t("payment.accountNumber")}</dt>
                    <dd className="font-semibold text-gray-900">{bt.accountNumber}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="font-medium text-gray-500">{t("payment.accountType")}</dt>
                    <dd className="font-semibold text-gray-900">{bt.accountType}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="font-medium text-gray-500">{t("payment.reference")}</dt>
                    <dd className="text-right font-semibold text-gray-900">{bt.referenceHint}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-gray-100 pt-2">
                    <dt className="font-medium text-gray-500">{t("payment.total")}</dt>
                    <dd className="font-bold text-brand-600">{totalFormatted}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs text-gray-400">{t("payment.leaveHint")}</p>
              </div>
            </div>
          </div>

          {proofSubmitted ? (
            <div
              className="mt-8 rounded-2xl border border-green-200 bg-green-50 px-6 py-4 text-center text-sm font-semibold text-green-800"
              role="status"
            >
              {order.paymentProofMethod === "whatsapp"
                ? t("admin.proofWhatsApp")
                : t("payment.proofUploaded")}
            </div>
          ) : (
            <section
              className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm print:hidden"
              aria-labelledby="proof-heading"
            >
              <div className="border-b border-gray-100 bg-gray-50/30 p-8">
                <h2 id="proof-heading" className="text-lg font-bold text-gray-900">
                  {t("payment.uploadProof")}
                </h2>
                <p className="mt-1 text-sm text-gray-500">{t("payment.nextStepHint")}</p>
              </div>
              <div className="space-y-6 p-8">
                <ProofUpload
                  displayId={order.displayId}
                  disabled={!canUpload}
                  onUploaded={() => void load()}
                />
                <WhatsAppProofButton
                  displayId={order.displayId}
                  buyerName={order.buyerName}
                  totalFormatted={totalFormatted}
                  locale={order.locale as "es" | "en"}
                  disabled={!canUpload}
                  onSent={() => void load()}
                  buttonClassName="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-4 font-bold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60 sm:w-auto"
                />
              </div>
            </section>
          )}

          <div className="mt-12 flex flex-col items-center justify-center gap-4 print:hidden sm:flex-row">
            <Link
              to="/"
              className="inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-10 py-4 font-bold text-white shadow-lg shadow-brand-500/20 transition-all hover:bg-brand-700 active:scale-[0.98] sm:w-auto"
            >
              {t("common.continueShopping")}
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-10 py-4 font-bold text-gray-600 transition-colors hover:bg-gray-100 sm:w-auto"
            >
              <Printer size={18} weight="bold" aria-hidden />
              {t("payment.printReceipt")}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
