import type { PriceDefinition } from "../../../application/publication/discovery-content";

// Una tarifa solo se publica con importe, base e IVA aprobados por el negocio.
// Las referencias externas documentadas no son precios de Manolo.
export const productPrices = [
  { productId: "business-cards", status: "quote" },
  { productId: "folders", status: "quote" },
  { productId: "letterheads", status: "quote" },
  { productId: "envelopes", status: "quote" },
  { productId: "order-pads", status: "quote" },
  { productId: "catalogs", status: "quote" },
  { productId: "leaflets", status: "quote" },
  { productId: "bifolds", status: "quote" },
  { productId: "trifolds", status: "quote" },
  { productId: "sales-sheets", status: "quote" },
] satisfies readonly PriceDefinition[];
