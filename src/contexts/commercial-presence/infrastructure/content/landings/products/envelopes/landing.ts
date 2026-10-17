import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const envelopesLanding = {
  productId: "envelopes",
  slug: "sobres-corporativos",
  editorial: {
    "intro": "Tu identidad, antes de abrir el documento. Sobres impresos para correspondencia y entregas de empresa.",
    "uses": [
      "Correspondencia corporativa.",
      "Entrega de documentos a clientes.",
      "Papelería coordinada con tu marca."
    ],
    "preparation": [
      "Indica las dimensiones del documento y si irá doblado.",
      "Comparte cantidad y datos que quieres imprimir.",
      "Envía logo y diseño o consulta por el desarrollo de la pieza."
    ],
    "faqs": [
      {
        "question": "¿Cómo elijo el formato del sobre?",
        "answer": "Indica qué documento irá dentro y si se entregará doblado. Con esa información se revisa el formato al cotizar."
      },
      {
        "question": "¿Puedo imprimir los datos de mi empresa?",
        "answer": "Comparte el logo y los datos que quieres incorporar. La distribución y el área de impresión se revisan con el formato elegido."
      }
    ]
  },
  search: {
    title: "{product} impresos con tu marca en {locality} | {company}",
    description:
      "Impresión de {product} para correspondencia y documentos de empresa. Cotiza formatos y cantidades por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description:
      "{product} para tus documentos. {benefit}. Cotiza por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
