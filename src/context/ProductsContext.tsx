import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@shared/product.types";
import { fetchProducts } from "@/lib/api";

type ProductsContextValue = {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProduct: (id: string) => Product | undefined;
  reload: () => Promise<void>;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : "error");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const getProduct = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products],
  );

  const value = useMemo(
    () => ({ products, loading, error, getProduct, reload: load }),
    [products, loading, error, getProduct, load],
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
