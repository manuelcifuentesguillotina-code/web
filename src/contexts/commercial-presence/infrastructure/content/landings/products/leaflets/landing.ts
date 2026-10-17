import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const leafletsLanding = {
  productId: "leaflets",
  slug: "folletos",
  editorial: {
    "intro": "Una idea clara, lista para circular. Folletos, flyers y volantes para presentar tu campaña en papel.",
    "uses": [
      "Difusión de campañas y promociones.",
      "Información de eventos y actividades.",
      "Presentación breve de productos y servicios."
    ],
    "preparation": [
      "Indica cantidad, tamaño y fecha en que necesitas el material.",
      "Comparte el diseño y las caras que necesitas imprimir.",
      "Cuéntanos cómo distribuirás los folletos para revisar las opciones."
    ],
    "faqs": [
      {
        "question": "¿Puedo cotizar flyers o volantes aquí?",
        "answer": "Indica el tamaño y el uso que les darás, junto con la cantidad y las caras que necesitas imprimir."
      },
      {
        "question": "¿Cuándo debo consultar por la entrega?",
        "answer": "Comparte tu fecha al iniciar la conversación. El plazo se confirma según el proyecto antes de acordar la producción."
      }
    ]
  },
  search: {
    title: "{product} publicitarios impresos en {locality} | {company}",
    description:
      "Impresión de {product}, flyers y volantes para campañas y promociones. Cotiza tu cantidad por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description: "{product} para tus campañas. {benefit}. Cotiza por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
