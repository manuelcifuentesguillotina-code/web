import { expect, it } from "vitest";
import { serializeStructuredData } from "./serialize-structured-data";

it("preserves structured values while preventing script termination", () => {
  const data = {
    name: "</script><script>alert(1)</script>",
    description: "línea\u2028separada\u2029",
  };
  const serialized = serializeStructuredData(data);
  expect(serialized).not.toContain("<");
  expect(serialized).not.toContain("\u2028");
  expect(JSON.parse(serialized)).toEqual(data);
});
