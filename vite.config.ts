import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { mockProductsApi } from "./vite.mockProducts";

const useMockProducts = process.env.VITE_MOCK_PRODUCTS === "1";

export default defineConfig({
  plugins: [react(), mockProductsApi()],
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
    watch: {
      ignored: ["**/playwright-report/**", "**/test-results/**"],
    },
    proxy: useMockProducts
      ? undefined
      : {
          "/api": {
            target: "http://127.0.0.1:3000",
            changeOrigin: true,
          },
        },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
