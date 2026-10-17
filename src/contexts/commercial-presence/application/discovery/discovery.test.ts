import { describe, expect, it } from "vitest";
import { createPresence } from "../presence/create-presence";
import { contentFixture } from "../publication/content.fixture";
import type { SiteContent } from "../publication/content";
import { validateContent } from "../publication/validate-content";

function application(content = contentFixture()) {
  return createPresence(
    { load: () => content },
    { resolve: () => ({ status: "pending", reason: "phone-unconfirmed" }) },
    {
      resolve: (address) =>
        "https://maps.example.test/?q=" + encodeURIComponent(address),
    },
  );
}

describe("discovery publication", () => {
  it("keeps canonical paths and sharing identity stable when names and prices change", () => {
    const content = contentFixture();
    const before = application(content).document("/productos/tarjetas");
    const after = application({
      ...content,
      products: content.products.map((item) => ({
        ...item,
        name: "Nueva " + item.name,
      })),
      prices: content.prices.map((item) =>
        item.productId === "card"
          ? {
              productId: "card",
              status: "approved",
              amount: 89000,
              currency: "CLP",
              basis: "500 tarjetas",
              tax: "included",
            }
          : item,
      ),
    }).document("/productos/tarjetas");
    expect(after?.seo.path).toBe(before?.seo.path);
    expect(after?.seo.image.path).toBe(before?.seo.image.path);
    expect(after?.seo.title).toContain("Nueva Tarjetas");
    expect(after?.price).toMatchObject({
      status: "approved",
      amount: 89000,
      basis: "500 tarjetas",
      taxLabel: "IVA incluido",
    });
  });

  it("derives collection membership from category identities and resolves contextual contact", () => {
    const content = contentFixture();
    const app = application(content);
    expect(
      app.topicLanding("/trabajos/papeleria")?.products.map((item) => item.id),
    ).toEqual(["card"]);
    expect(app.topicLanding("/trabajos/papeleria")?.contact.message).toBe(
      "quiero mi descuento de 20%\nMe interesa: Papelería",
    );
    const moved = application({
      ...content,
      products: content.products.map((item) => ({
        ...item,
        categoryId: "stationery",
      })),
    });
    expect(moved.topicLanding("/trabajos/papeleria")?.products).toHaveLength(2);
    expect(moved.document("/no-existe")).toBeUndefined();
    expect(moved.topicLanding("/productos/tarjetas")).toBeUndefined();
  });

  it("rejects duplicate routes, missing product SEO, unknown selections and incomplete tariffs", () => {
    const original = contentFixture();
    const topic = original.discovery.topics.find(
      (item) => item.kind === "collection",
    );
    if (!topic) throw new Error("Fixture sin agrupación");
    const invalid: SiteContent[] = [
      {
        ...original,
        discovery: {
          ...original.discovery,
          topics: [topic, { ...topic, id: "another" }],
        },
      },
      { ...original, productLandings: [] },
      {
        ...original,
        discovery: {
          ...original.discovery,
          topics: original.discovery.topics.map((item) =>
            item.id === topic.id
              ? { ...item, selection: { productIds: ["missing"] } }
              : item,
          ),
        },
      },
      {
        ...original,
        prices: [
          {
            productId: "card",
            status: "approved",
            amount: 0,
            currency: "CLP",
            basis: "100 tarjetas",
            tax: "excluded",
          },
          original.prices[1],
        ],
      },
      { ...original, prices: [] },
    ];
    for (const content of invalid)
      expect(() => validateContent(content)).toThrow(/no publicable/);
  });

  it("publishes only approved prices as offers and never applies the project discount to them", () => {
    const content = contentFixture();
    const origin = "https://example.test";
    const pending = application(content).structuredData(
      "/productos/tarjetas",
      origin,
    );
    expect(JSON.stringify(pending)).not.toContain('"Offer"');
    const app = application({
      ...content,
      prices: content.prices.map((item) =>
        item.productId === "card"
          ? {
              productId: "card",
              status: "approved",
              amount: 100000,
              currency: "CLP",
              basis: "500 tarjetas",
              tax: "excluded",
            }
          : item,
      ),
      offer: { ...content.offer, percent: 30 },
    });
    const graph = app.structuredData("/productos/tarjetas", origin);
    expect(JSON.stringify(graph)).toContain('"price":100000');
    expect(JSON.stringify(graph)).toContain('"valueAddedTaxIncluded":false');
    expect(JSON.stringify(graph)).not.toContain('"price":70000');
    expect(app.productLanding("tarjetas")?.product.contact.message).toContain(
      "30%",
    );
  });

  it("derives business facts and ordered breadcrumb URLs without fabricated ratings", () => {
    const original = contentFixture();
    const app = application({
      ...original,
      company: {
        ...original.company,
        name: "Nueva imprenta",
        phone: { status: "ready", international: "+56911112222" },
        address: { ...original.company.address, number: "42" },
        hours: { days: ["Saturday"], opens: "10:00", closes: "14:00" },
      },
    });
    const graph = JSON.stringify(
      app.structuredData("/productos/tarjetas", "https://example.test"),
    );
    expect(graph).toContain("Calle de prueba 42");
    expect(graph).toContain("+56911112222");
    expect(graph).toContain("https://schema.org/Saturday");
    expect(graph).toContain("https://example.test/trabajos/papeleria");
    expect(graph).not.toMatch(/aggregateRating|review|availability/);
    expect(app.home().company.hours).toBe("Sábado · 10:00–14:00");
  });
});
