import { useCallback, useEffect, useRef, useState } from "react";
import { fetchAdminOrder } from "@/lib/api";
import type { AdminOrderDetail } from "@/types/commerce";

const POLL_MS = 30_000;

export function useAdminOrder(displayId: string | undefined, token: string | null) {
  const [order, setOrder] = useState<AdminOrderDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const visibleRef = useRef(true);

  const load = useCallback(async () => {
    if (!token || !displayId) return;
    setLoading(true);
    setError(null);
    setNotFound(false);
    try {
      const data = await fetchAdminOrder(token, displayId);
      setOrder(data.order);
    } catch (err) {
      const status = (err as Error & { status?: number }).status;
      if (status === 404) {
        setNotFound(true);
        setOrder(null);
      } else {
        setError(err instanceof Error ? err.message : "error");
      }
    } finally {
      setLoading(false);
    }
  }, [token, displayId]);

  useEffect(() => {
    if (!token || !displayId) {
      setOrder(null);
      return;
    }
    void load();
  }, [token, displayId, load]);

  useEffect(() => {
    if (!token || !displayId) return;

    const onVisibility = () => {
      visibleRef.current = document.visibilityState === "visible";
      if (visibleRef.current) void load();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const id = setInterval(() => {
      if (visibleRef.current) void load();
    }, POLL_MS);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      clearInterval(id);
    };
  }, [token, displayId, load]);

  return { order, loading, error, notFound, reload: load };
}
