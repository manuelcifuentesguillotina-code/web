import { mergeConfig } from "vitest/config";
import { baseTestConfig } from "./vitest.shared.mts";

export default mergeConfig(baseTestConfig, {
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["src/**/*.integration.test.ts"],
  },
});
