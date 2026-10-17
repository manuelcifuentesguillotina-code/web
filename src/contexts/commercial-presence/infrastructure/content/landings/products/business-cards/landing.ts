import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const businessCardsLanding = {
  productId: "business-cards",
  slug: "tarjetas-de-presentacion",
  search: {
    title: "{product} impresas | {company}",
    description:
      "{product} para equipos de trabajo. Diseño e impresión. Cotiza cantidad y formato por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description: "{product} con tu marca. {benefit}. Cotiza por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
