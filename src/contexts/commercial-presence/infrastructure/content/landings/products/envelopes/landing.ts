import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const envelopesLanding = {
  productId: "envelopes",
  slug: "sobres-corporativos",
  search: {
    title: "{product} impresos con tu marca | {company}",
    description:
      "Impresión de {product} para correspondencia y documentos de empresa. Cotiza formatos y cantidades por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description:
      "{product} para tus documentos. {benefit}. Cotiza por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
