import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: ["src/test/setup.ts", "server/test/setup.ts"],
      include: ["src/**/*.test.{ts,tsx}", "server/**/*.test.ts", "shared/**/*.test.ts"],
      coverage: {
        include: ["src/lib/**", "server/**"],
      },
    },
  }),
);
