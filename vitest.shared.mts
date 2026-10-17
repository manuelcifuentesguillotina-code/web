import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export const baseTestConfig = defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  test: { environment: "node", restoreMocks: true, allowOnly: false },
});
