import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const foldersLanding = {
  productId: "folders",
  slug: "carpetas-corporativas",
  search: {
    title: "{product} personalizadas | {company}",
    description:
      "Impresión de {product} para propuestas y documentos de empresa. Diseño y terminaciones. Cotiza por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description:
      "{product} para tus propuestas. {benefit}. Hablemos por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
