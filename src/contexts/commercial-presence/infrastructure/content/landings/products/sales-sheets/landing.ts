import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const salesSheetsLanding = {
  productId: "sales-sheets",
  slug: "fichas-comerciales",
  search: {
    title: "{product} impresas | {company}",
    description:
      "Impresión de {product} para ventas y presentaciones de productos. Cotiza formato y cantidad por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description: "{product} para tus ventas. {benefit}. Cotiza por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
