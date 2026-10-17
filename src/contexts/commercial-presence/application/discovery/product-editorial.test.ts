import { describe, expect, it } from "vitest";
import { createPresence } from "../presence/create-presence";
import { contentFixture } from "../publication/content.fixture";
import type { SiteContent } from "../publication/content";
import { validateContent } from "../publication/validate-content";
import { createSharingContent } from "../sharing/create-sharing-content";

function application(content: SiteContent) {
  return createPresence(
    { load: () => content },
    { resolve: () => ({ status: "pending", reason: "phone-unconfirmed" }) },
    { resolve: () => "https://maps.example.test/" },
  );
}

describe("independent product campaigns", () => {
  it("edits search and social independently without changing another destination or its tariff", () => {
    const content = contentFixture();
    const before = application(content);
    const searchChanged = application({
      ...content,
      productLandings: content.productLandings.map((landing) =>
        landing.productId === "card"
          ? {
              ...landing,
              search: {
                title: "{product} para equipos | {company}",
                description: "{product} impresas para equipos de venta.",
              },
            }
          : landing,
      ),
    });
    expect(searchChanged.document("/productos/tarjetas")?.seo.title).toContain(
      "para equipos",
    );
    expect(searchChanged.document("/productos/tarjetas")?.seo.social).toEqual(
      before.document("/productos/tarjetas")?.seo.social,
    );
    expect(searchChanged.productLanding("tarjetas")?.product).toEqual(
      before.productLanding("tarjetas")?.product,
    );
    expect(searchChanged.document("/productos/catalogos")).toEqual(
      before.document("/productos/catalogos"),
    );
    const socialChanged = application({
      ...content,
      productLandings: content.productLandings.map((landing) =>
        landing.productId === "card"
          ? {
              ...landing,
              social: {
                title: "{product} con tu marca",
                description: "{product}. {benefit}. WhatsApp.",
              },
            }
          : landing,
      ),
    });
    expect(socialChanged.document("/productos/tarjetas")?.seo.title).toBe(
      before.document("/productos/tarjetas")?.seo.title,
    );
    expect(
      socialChanged.document("/productos/tarjetas")?.seo.social.title,
    ).toContain("con tu marca");
  });

  it("propagates catalog identity and offer changes to search, social, artwork and contact while preserving the paid URL", () => {
    const content = contentFixture();
    const app = application({
      ...content,
      products: content.products.map((product) =>
        product.id === "card"
          ? { ...product, name: "Tarjetas impresas" }
          : product,
      ),
      offer: { ...content.offer, percent: 25 },
    });
    const landing = app.productLanding("tarjetas");
    const document = app.document("/productos/tarjetas");
    if (!document || !landing) throw new Error("Fixture sin landing");
    expect(landing.product.name).toBe("Tarjetas impresas");
    expect(document.seo).toMatchObject({
      path: "/productos/tarjetas",
      title: "Tarjetas impresas | Imprenta de prueba",
      social: {
        title: "Tarjetas impresas",
        description: "Tarjetas impresas. 25% de descuento.",
      },
    });
    expect(landing.product.contact.message).toBe(
      "quiero mi descuento de 25%\nMe interesa: Tarjetas impresas",
    );
    expect(
      createSharingContent(document, app.home().company, "example.test"),
    ).toMatchObject({
      heading: "Tarjetas impresas",
      benefit: "25% de descuento",
    });
    expect(
      JSON.stringify(
        app.structuredData(document.seo.path, "https://example.test"),
      ),
    ).toContain('"name":"Tarjetas impresas"');
  });

  it("rejects generic promises and editorial that detaches the message from the product authority", () => {
    const content = contentFixture();
    for (const title of [
      "Calidad {product}",
      "Precisión {product}",
      "Impresión para todos",
    ]) {
      expect(() =>
        validateContent({
          ...content,
          productLandings: content.productLandings.map((landing) => ({
            ...landing,
            search: { ...landing.search, title },
          })),
        }),
      ).toThrow(/mensaje genérico|identificar/);
    }
    expect(() =>
      validateContent({
        ...content,
        productLandings: content.productLandings.map((landing) => ({
          ...landing,
          social: { ...landing.social, description: "" },
        })),
      }),
    ).toThrow("metadatos vacíos");
  });
});
