import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const foldersLanding = {
  productId: "folders",
  slug: "carpetas-corporativas",
  editorial: {
    "intro": "Dale un lugar a tu propuesta. Carpetas corporativas para reunir documentos y presentar tu marca en una sola pieza.",
    "uses": [
      "Propuestas comerciales.",
      "Documentación de reuniones y capacitaciones.",
      "Material corporativo para entregar a clientes."
    ],
    "preparation": [
      "Indica cantidad y tamaño de los documentos que llevará la carpeta.",
      "Comparte tu diseño o los elementos de marca disponibles.",
      "Describe las terminaciones que buscas para revisar su viabilidad."
    ],
    "faqs": [
      {
        "question": "¿Qué tamaño de carpeta necesito?",
        "answer": "Parte por el tamaño y el volumen de los documentos que quieres guardar. Envíanos esos datos para revisar el formato."
      },
      {
        "question": "¿Puedo consultar por terminaciones?",
        "answer": "Cuéntanos cómo quieres presentar la carpeta. Las terminaciones y su disponibilidad se confirman al cotizar."
      }
    ]
  },
  search: {
    title: "{product} personalizadas en {locality} | {company}",
    description:
      "Impresión de {product} para propuestas y documentos de empresa. Diseño y terminaciones. Cotiza por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description:
      "{product} para tus propuestas. {benefit}. Hablemos por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
