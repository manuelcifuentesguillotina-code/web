import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const businessCardsLanding = {
  productId: "business-cards",
  slug: "tarjetas-de-presentacion",
  editorial: {
    "intro": "Tu marca empieza en un encuentro. Tarjetas de presentación para que tus datos sigan presentes después de una reunión.",
    "uses": [
      "Presentaciones de equipos y profesionales.",
      "Reuniones y encuentros comerciales.",
      "Datos de contacto junto a tus entregas."
    ],
    "preparation": [
      "Indica cantidad por persona y número de versiones.",
      "Comparte logo, datos de contacto y diseño disponible.",
      "Cuéntanos el formato y las caras que necesitas imprimir."
    ],
    "faqs": [
      {
        "question": "¿Puedo pedir tarjetas para varias personas?",
        "answer": "Indica los nombres, los datos y la cantidad por persona al consultar. Así podemos cotizar el conjunto de versiones."
      },
      {
        "question": "¿Necesito tener el diseño listo?",
        "answer": "Si tienes un archivo, compártelo al cotizar. Si necesitas diseño, envía tu logo y los datos que quieres incluir."
      }
    ]
  },
  search: {
    title: "{product} impresas en {locality} | {company}",
    description:
      "{product} para equipos de trabajo. Diseño e impresión. Cotiza cantidad y formato por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description: "{product} con tu marca. {benefit}. Cotiza por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
