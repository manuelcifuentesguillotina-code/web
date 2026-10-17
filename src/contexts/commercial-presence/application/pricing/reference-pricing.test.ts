import { expect, it } from "vitest";
import { contentFixture } from "../publication/content.fixture";
import { validateContent } from "../publication/validate-content";
import { createPresence } from "../presence/create-presence";

const referencePrice = {
  productId: "card",
  status: "reference",
  amount: 98663,
  currency: "CLP",
  basis: "500 tarjetas",
  tax: "included",
  reference: {
    provider: "Prueba",
    href: "https://example.test/precios",
    checkedOn: "2026-10-17",
    scope: "Sin diseño.",
  },
} as const;

it("rejects references without traceable source, scope, valid date, quantity or tax", () => {
  const original = contentFixture();
  const { reference } = referencePrice;
  for (const invalid of [
    { ...referencePrice, amount: 0 },
    { ...referencePrice, basis: "" },
    {
      ...referencePrice,
      reference: { ...reference, href: "http://example.test" },
    },
    { ...referencePrice, reference: { ...reference, provider: "" } },
    { ...referencePrice, reference: { ...reference, scope: "" } },
    { ...referencePrice, reference: { ...reference, checkedOn: "2026-02-30" } },
  ]) {
    expect(() =>
      validateContent({ ...original, prices: [invalid, original.prices[1]] }),
    ).toThrow("no publicable");
  }
});

it("shares the reference across all views without emitting a seller offer or discounting it", () => {
  const original = contentFixture();
  const app = createPresence(
    {
      load: () => ({
        ...original,
        prices: [referencePrice, original.prices[1]],
        offer: { ...original.offer, percent: 30 },
      }),
    },
    { resolve: () => ({ status: "pending", reason: "phone-unconfirmed" }) },
    { resolve: () => "https://maps.example.test/" },
  );
  const product = app.productLanding("tarjetas")?.product;
  expect(product?.price).toMatchObject({ status: "reference", amount: 98663 });
  expect(app.home().navigation[0].items[0].price).toEqual(product?.price);
  expect(app.document("/productos/tarjetas")?.price).toEqual(product?.price);
  expect(
    JSON.stringify(
      app.structuredData("/productos/tarjetas", "https://example.test"),
    ),
  ).not.toContain('"Offer"');
  expect(product?.contact.message).toContain("30%");
  expect(product?.price.label).toBe("Referencia $98.663");
});
