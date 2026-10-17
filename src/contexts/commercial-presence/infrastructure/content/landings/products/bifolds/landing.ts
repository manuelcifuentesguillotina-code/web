import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const bifoldsLanding = {
  productId: "bifolds",
  slug: "dipticos",
  search: {
    title: "{product} impresos y plegados | {company}",
    description:
      "Impresión de {product} para presentar productos y servicios. Diseño, impresión y plegado. Cotiza por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description:
      "{product} impresos y plegados. {benefit}. Cotiza por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
