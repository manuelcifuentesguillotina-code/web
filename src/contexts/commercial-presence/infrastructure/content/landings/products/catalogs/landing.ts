import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const catalogsLanding = {
  productId: "catalogs",
  slug: "catalogos-de-productos",
  search: {
    title: "Impresión de {product} | {company}",
    description:
      "Impresión y encuadernación de {product} para ventas y presentaciones. Cotiza tu tiraje por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description:
      "{product} impresos y encuadernados. {benefit}. Hablemos por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
