import { describe, expect, it } from "vitest";
import { publishPrice } from "./publish-price";

describe("published prices", () => {
  it("keeps unconfirmed amounts out of every published price view", () => {
    expect(publishPrice()).toEqual({
      status: "quote",
      label: "Precio por proyecto",
    });
    expect(
      publishPrice({ productId: "card", status: "quote" }),
    ).not.toHaveProperty("amount");
  });
  it("formats Chilean pesos and makes quantity and tax basis explicit", () => {
    const base = {
      productId: "card",
      status: "approved",
      amount: 89000,
      currency: "CLP",
      basis: "500 tarjetas",
      tax: "included",
    } as const;
    expect(publishPrice(base)).toMatchObject({
      label: "Desde $89.000",
      basis: "500 tarjetas",
      taxLabel: "IVA incluido",
    });
    expect(publishPrice({ ...base, tax: "excluded" })).toMatchObject({
      label: "Desde $89.000",
      taxLabel: "+ IVA",
    });
  });
});
