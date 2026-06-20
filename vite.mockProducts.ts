import type { Plugin } from "vite";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function mockProductsApi(): Plugin {
  return {
    name: "mock-products-api",
    configureServer(server) {
      if (process.env.VITE_MOCK_PRODUCTS !== "1") return;

      const payload = readFileSync(
        path.resolve(__dirname, "e2e/fixtures/products.json"),
        "utf8",
      );

      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url !== "/api/products") return next();
        if (req.method !== "GET") return next();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(payload);
      });
    },
  };
}
