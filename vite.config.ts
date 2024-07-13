import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { aliasObject } from "./alias";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: aliasObject,
  },
  build: {
    cssMinify: "lightningcss",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
