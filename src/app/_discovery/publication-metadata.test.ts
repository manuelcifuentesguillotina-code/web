import { afterEach, describe, expect, it, vi } from "vitest";
import { composeCommercialPresence } from "@/composition/commercial-presence/compose-commercial-presence";
import sitemap from "../sitemap";
import robots from "../robots";
import { pageMetadata } from "./page-metadata";

vi.mock("server-only", () => ({}));
afterEach(() => vi.unstubAllEnvs());

describe("publication adapters", () => {
  it("uses the configured origin for canonical, social images and the public sitemap", () => {
    vi.stubEnv("SITE_MODE", "public");
    vi.stubEnv("SITE_ORIGIN", "https://example.test");
    const app = composeCommercialPresence();
    const seo = app.productLanding("tripticos")?.seo;
    if (!seo) throw new Error("Falta landing de prueba de contrato");
    expect(pageMetadata(seo)).toMatchObject({
      alternates: { canonical: "https://example.test/productos/tripticos" },
      robots: { index: true, follow: true },
      openGraph: {
        siteName: app.home().company.name,
        images: [
          {
            url: "https://example.test/compartir/trifolds",
            width: 1200,
            height: 630,
            type: "image/png",
          },
        ],
      },
    });
    expect(sitemap()).toHaveLength(18);
    expect(sitemap().map((item) => item.url)).toContain(
      "https://example.test/servicios/corte-con-guillotina",
    );
    expect(
      sitemap().every(
        (item) =>
          item.url.startsWith("https://example.test/") && !item.lastModified,
      ),
    ).toBe(true);
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://example.test/sitemap.xml",
    });
  });

  it("keeps review pages out of the sitemap and blocks review crawling and indexing", () => {
    vi.stubEnv("SITE_MODE", "preview");
    const seo = composeCommercialPresence().home().seo;
    expect(pageMetadata(seo).robots).toMatchObject({
      index: false,
      follow: false,
    });
    expect(sitemap()).toEqual([]);
    expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  });
});
