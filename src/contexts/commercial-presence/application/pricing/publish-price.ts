import type { PublishedPrice } from "../../contracts";
import type { PriceDefinition } from "../publication/discovery-content";

export function publishPrice(price?: PriceDefinition): PublishedPrice {
  if (!price || price.status === "quote")
    return { status: "quote", label: "Precio por proyecto" };
  const amount = {
    amount: price.amount,
    currency: price.currency,
    label:
      (price.status === "reference" ? "Referencia $" : "Desde $") +
      price.amount.toLocaleString("es-CL"),
    basis: price.basis,
    tax: price.tax,
    taxLabel: price.tax === "included" ? "IVA incluido" : "+ IVA",
  };
  return price.status === "reference"
    ? { ...amount, status: "reference", reference: price.reference }
    : { ...amount, status: "approved" };
}
