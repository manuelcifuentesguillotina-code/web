import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const letterheadsLanding = {
  productId: "letterheads",
  slug: "hojas-membretadas",
  editorial: {
    "intro": "Que cada documento hable de tu empresa. Hojas membretadas para mantener tu identidad en cartas y comunicaciones.",
    "uses": [
      "Cartas corporativas.",
      "Propuestas y documentos de empresa.",
      "Papelería para el trabajo diario."
    ],
    "preparation": [
      "Indica formato de hoja y cantidad.",
      "Comparte logo, datos de empresa y diseño disponible.",
      "Cuéntanos si después imprimirás sobre las hojas y con qué equipo."
    ],
    "faqs": [
      {
        "question": "¿Qué debe incluir una hoja membretada?",
        "answer": "Comparte los elementos que necesitas: logo, datos de contacto y datos de empresa. El contenido final lo defines tú."
      },
      {
        "question": "¿Puedo usar las hojas en mi impresora?",
        "answer": "Indica el tipo de impresora al consultar. El papel y su compatibilidad deben confirmarse antes de producir."
      }
    ]
  },
  search: {
    title: "{product} para empresas en {locality} | {company}",
    description:
      "Impresión de {product} con tu marca para cartas y documentos. Cotiza formato y cantidad por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description: "{product} con tu marca. {benefit}. Cotiza por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
