import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  test: { environment: "node" },
  resolve: {
    // Đồng bộ alias với tsconfig.paths để test import được @config/@content/@/*.
    alias: [
      {
        find: "@config",
        replacement: fileURLToPath(new URL("./client.config.ts", import.meta.url)),
      },
      {
        find: "@content",
        replacement: fileURLToPath(new URL("./content.config.ts", import.meta.url)),
      },
      {
        find: "@catalog",
        replacement: fileURLToPath(new URL("./catalog.config.ts", import.meta.url)),
      },
      {
        find: /^@\//,
        replacement: fileURLToPath(new URL("./src/", import.meta.url)),
      },
    ],
  },
});
