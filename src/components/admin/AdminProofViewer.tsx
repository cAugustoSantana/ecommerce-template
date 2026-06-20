import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { AdminOrderDetail } from "@/types/commerce";
import shared from "@/styles/shared.module.css";
import styles from "@/pages/admin/admin.module.css";

export function AdminProofViewer({
  order,
  token,
}: {
  order: Pick<AdminOrderDetail, "id" | "hasProof" | "paymentProofMethod">;
  token: string;
}) {
  const { t } = useTranslation();
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!order.hasProof) {
    if (order.paymentProofMethod === "whatsapp") {
      return <span>{t("admin.proofWhatsApp")}</span>;
    }
    return <span>{t("admin.noProof")}</span>;
  }

  const loadProof = async () => {
    if (loading) return;
    if (url) {
      URL.revokeObjectURL(url);
      setUrl(null);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/proof/${order.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("failed");
      const blob = await res.blob();
      if (!blob.type.startsWith("image/")) {
        throw new Error("invalid_response");
      }
      setUrl(URL.createObjectURL(blob));
    } catch {
      setError(t("admin.proofLoadFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button type="button" className={styles.proofBtn} onClick={() => void loadProof()}>
        {loading
          ? t("common.loading")
          : url
            ? t("admin.hideProof")
            : t("admin.viewProof")}
      </button>
      {error && <p className={shared.error}>{error}</p>}
      {url && <img src={url} alt="" className={styles.proofImg} />}
    </div>
  );
}
