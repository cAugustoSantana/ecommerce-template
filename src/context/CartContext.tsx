import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useProducts } from "@/context/ProductsContext";
import { storeConfig } from "@shared/store.config";
import type { CartLine } from "@/types/commerce";

type CartContextValue = {
  lines: CartLine[];
  addLine: (line: Omit<CartLine, "lineId">) => void;
  removeLine: (lineId: string) => void;
  updateLineQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  taxAmount: number;
  grandTotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function lineKey(productId: string, variants: Record<string, string>) {
  return `${productId}:${JSON.stringify(variants)}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { getProduct } = useProducts();

  const addLine = (line: Omit<CartLine, "lineId">) => {
    setLines((prev) => {
      const key = lineKey(line.productId, line.variants);
      const existing = prev.find(
        (l) => lineKey(l.productId, l.variants) === key,
      );
      if (existing) {
        return prev.map((l) =>
          l.lineId === existing.lineId
            ? { ...l, quantity: l.quantity + line.quantity }
            : l,
        );
      }
      return [...prev, { ...line, lineId: crypto.randomUUID() }];
    });
    setDrawerOpen(true);
  };

  const removeLine = (lineId: string) => {
    setLines((prev) => prev.filter((l) => l.lineId !== lineId));
  };

  const updateLineQuantity = (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeLine(lineId);
      return;
    }
    setLines((prev) =>
      prev.map((l) =>
        l.lineId === lineId ? { ...l, quantity: Math.min(99, quantity) } : l,
      ),
    );
  };

  const clearCart = () => {
    setLines([]);
    setDrawerOpen(false);
  };

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const total = useMemo(() => {
    return lines.reduce((sum, line) => {
      const product = getProduct(line.productId);
      return sum + (product?.price ?? 0) * line.quantity;
    }, 0);
  }, [lines, getProduct]);

  const taxRate = storeConfig.taxRate;
  const taxAmount = useMemo(() => Math.round(total * taxRate), [total]);
  const grandTotal = total + taxAmount;

  useEffect(() => {
    if (lines.length === 0 && isDrawerOpen) {
      setDrawerOpen(false);
    }
  }, [lines.length, isDrawerOpen]);

  useEffect(() => {
    if (!isDrawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isDrawerOpen]);

  const value = useMemo(
    () => ({
      lines,
      addLine,
      removeLine,
      updateLineQuantity,
      clearCart,
      total,
      taxAmount,
      grandTotal,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
    }),
    [lines, total, taxAmount, grandTotal, isDrawerOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
