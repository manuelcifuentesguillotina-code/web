import type { PublishedPrice } from "../../contracts";
import type { PriceDefinition } from "../publication/discovery-content";

export function publishPrice(price?: PriceDefinition): PublishedPrice {
  if (!price || price.status === "quote")
    return { status: "quote", label: "Precio por proyecto" };
  return {
    status: "approved",
    amount: price.amount,
    currency: price.currency,
    label: "Desde $" + price.amount.toLocaleString("es-CL"),
    basis: price.basis,
    tax: price.tax,
    taxLabel: price.tax === "included" ? "IVA incluido" : "+ IVA",
  };
}
