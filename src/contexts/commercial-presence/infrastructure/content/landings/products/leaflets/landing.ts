import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const leafletsLanding = {
  productId: "leaflets",
  slug: "folletos",
  search: {
    title: "{product} publicitarios impresos | {company}",
    description:
      "Impresión de {product}, flyers y volantes para campañas y promociones. Cotiza tu cantidad por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description: "{product} para tus campañas. {benefit}. Cotiza por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
