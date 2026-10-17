import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const orderPadsLanding = {
  productId: "order-pads",
  slug: "talonarios",
  search: {
    title: "{product} con copia | {company}",
    description:
      "Impresión de {product} para órdenes y registros con copia. Cotiza cantidad y formato por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description: "{product} con copia. {benefit}. Cotiza por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
