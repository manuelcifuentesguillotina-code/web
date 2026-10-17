import type { PriceDefinition } from "../../../application/publication/discovery-content";

// Referencias externas verificadas y autorizadas para orientación; no son tarifas de Manolo.
export const productPrices = [
  {
    productId: "business-cards",
    status: "reference",
    amount: 17000,
    currency: "CLP",
    basis: "100 tarjetas",
    tax: "included",
    reference: {
      provider: "Play Express",
      href: "https://playexpress.cl/productos/tarjeta-de-presentacion-premium",
      checkedOn: "2026-10-17",
      scope: "Dos caras · laminadas · sin diseño.",
    },
  },
  {
    productId: "folders",
    status: "reference",
    amount: 170000,
    currency: "CLP",
    basis: "100 carpetas",
    tax: "included",
    reference: {
      provider: "Play Express",
      href: "https://playexpress.cl/productos/categoria/carpetas",
      checkedOn: "2026-10-17",
      scope: "Carta · laminadas · sin diseño.",
    },
  },
  { productId: "letterheads", status: "quote" },
  { productId: "envelopes", status: "quote" },
  { productId: "order-pads", status: "quote" },
  { productId: "catalogs", status: "quote" },
  { productId: "leaflets", status: "quote" },
  { productId: "bifolds", status: "quote" },
  {
    productId: "trifolds",
    status: "reference",
    amount: 100000,
    currency: "CLP",
    basis: "1.000 unidades",
    tax: "included",
    reference: {
      provider: "StudiOne",
      href: "https://www.studione.cl/impresiones/tripticos/",
      checkedOn: "2026-10-17",
      scope: "20 × 28 cm · 170 g · plegado.",
    },
  },
  { productId: "sales-sheets", status: "quote" },
] satisfies readonly PriceDefinition[];
