import { describe, expect, it } from "vitest";
import { assertReleaseReady, readSiteConfig, SiteConfigurationError } from "./publication-config";

describe("publication configuration", () => {
  it("permits an explicit preview with pending contact and rejects a public release", () => {
    const preview = readSiteConfig({ SITE_MODE: "preview" });
    expect(() => assertReleaseReady(preview, false)).not.toThrow();
    expect(() => assertReleaseReady({ ...preview, mode: "public" }, false)).toThrow("WhatsApp");
    expect(() => assertReleaseReady({ ...preview, mode: "public" }, true)).not.toThrow();
  });
  it.each(["javascript:alert(1)", "https://example.test/path", "https://user:pass@example.test", "invalid", 42])(
    "rejects invalid origins: %s", (origin) => {
      expect(() => readSiteConfig({ SITE_ORIGIN: origin })).toThrow(SiteConfigurationError);
    },
  );
  it("rejects unknown publication modes and normalizes a valid origin", () => {
    expect(() => readSiteConfig({ SITE_MODE: "unknown" })).toThrow(SiteConfigurationError);
    expect(readSiteConfig({ SITE_ORIGIN: "https://example.test:443/" }).origin).toBe("https://example.test");
  });
});
