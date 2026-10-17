import { describe, expect, it } from "vitest";
import { validateContent, PublicationError } from "./validate-content";
import { contentFixture } from "./content.fixture";

describe("publication contract", () => {
  it("rejects empty or duplicate product search terms", () => {
    const content = contentFixture();
    for (const searchTerms of [[" "], ["flyers", "flyers"]]) {
      expect(() =>
        validateContent({
          ...content,
          products: content.products.map((item) => ({ ...item, searchTerms })),
        }),
      ).toThrow("término de búsqueda");
    }
  });
  it("rejects an unresolved hero and invalid marketing copy", () => {
    const content = contentFixture();
    expect(() =>
      validateContent({
        ...content,
        home: { ...content.home, heroMediaId: "missing" },
      }),
    ).toThrow("recurso de portada inexistente");
    expect(() =>
      validateContent({
        ...content,
        copy: {
          ...content.copy,
          catalog: { ...content.copy.catalog, heading: "Una\ndos\ntres" },
        },
      }),
    ).toThrow("supera dos líneas");
  });
  it("rejects required data missing and duplicate product identities", () => {
    const content = contentFixture();
    expect(() =>
      validateContent({
        ...content,
        company: { ...content.company, name: " " },
      }),
    ).toThrow(PublicationError);
    expect(() =>
      validateContent({
        ...content,
        products: [content.products[0], content.products[0]],
      }),
    ).toThrow("duplicado");
  });
  it("rejects broken product, media and category references", () => {
    const content = contentFixture();
    expect(() =>
      validateContent({
        ...content,
        products: content.products.map((item) => ({
          ...item,
          categoryId: "unknown",
        })),
      }),
    ).toThrow("categoría inexistente");
    expect(() =>
      validateContent({
        ...content,
        products: content.products.map((item) => ({
          ...item,
          mediaId: "unknown",
        })),
      }),
    ).toThrow("recurso inexistente");
    expect(() =>
      validateContent({
        ...content,
        productLandings: [
          {
            ...content.productLandings[0],
            productId: "unknown",
            slug: "unknown",
          },
        ],
      }),
    ).toThrow("producto inexistente");
  });
  it("rejects missing landings and duplicate slugs", () => {
    const content = contentFixture();
    expect(() => validateContent({ ...content, productLandings: [] })).toThrow(
      "sin landing",
    );
    expect(() =>
      validateContent({
        ...content,
        productLandings: content.productLandings.map((item) => ({
          ...item,
          slug: "same",
        })),
      }),
    ).toThrow("slug duplicado");
  });
  it("rejects invalid quantity and missing category selection", () => {
    const content = contentFixture();
    expect(() =>
      validateContent({
        ...content,
        products: content.products.map((item) => ({
          ...item,
          typicalQuantity: { amount: 0, unit: "unidades" },
        })),
      }),
    ).toThrow("cantidad orientativa");
    expect(() =>
      validateContent({
        ...content,
        home: { ...content.home, categoryOrder: [] },
      }),
    ).toThrow("sin selección");
  });

  it("rejects approved images without valid local source or dimensions", () => {
    const content = contentFixture();
    for (const src of [
      "",
      "//external.example/image.jpg",
      "https://external.example/image.jpg",
    ]) {
      expect(() =>
        validateContent({
          ...content,
          media: [
            {
              ...content.media[0],
              status: "ready",
              src,
              width: 1200,
              height: 900,
            },
            ...content.media.slice(1),
          ],
        }),
      ).toThrow("imagen aprobada inválida");
    }
    expect(() =>
      validateContent({
        ...content,
        media: [
          {
            ...content.media[0],
            status: "ready",
            src: "/image.jpg",
            width: 0,
            height: 900,
          },
          ...content.media.slice(1),
        ],
      }),
    ).toThrow("imagen aprobada inválida");
  });
});
