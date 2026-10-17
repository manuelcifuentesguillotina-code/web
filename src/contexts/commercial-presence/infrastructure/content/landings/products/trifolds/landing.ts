import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const trifoldsLanding = {
  productId: "trifolds",
  slug: "tripticos",
  search: {
    title: "{product} para campañas | {company}",
    description:
      "Impresión de {product} plegados para campañas y presentaciones de empresa. Cotiza tu proyecto por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description:
      "{product} impresos y plegados. {benefit}. Hablemos por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
