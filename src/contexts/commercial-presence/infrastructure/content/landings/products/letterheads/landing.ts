import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const letterheadsLanding = {
  productId: "letterheads",
  slug: "hojas-membretadas",
  search: {
    title: "{product} para empresas | {company}",
    description:
      "Impresión de {product} con tu marca para cartas y documentos. Cotiza formato y cantidad por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description: "{product} con tu marca. {benefit}. Cotiza por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
