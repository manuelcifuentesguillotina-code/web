import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const salesSheetsLanding = {
  productId: "sales-sheets",
  slug: "fichas-comerciales",
  editorial: {
    "intro": "La información que ayuda a decidir. Fichas comerciales impresas para presentar cada producto con sus datos a la vista.",
    "uses": [
      "Presentaciones individuales de productos.",
      "Apoyo para visitas comerciales.",
      "Información junto a una propuesta."
    ],
    "preparation": [
      "Indica formato, cantidad y número de versiones.",
      "Comparte imágenes, características y datos de cada ficha.",
      "Señala las caras a imprimir y si ya cuentas con diseño."
    ],
    "faqs": [
      {
        "question": "¿Puedo hacer una ficha para cada producto?",
        "answer": "Indica cuántas versiones necesitas y la cantidad de cada una. Comparte sus contenidos para preparar la cotización."
      },
      {
        "question": "¿Qué contenido conviene preparar?",
        "answer": "Reúne nombre, imágenes, características y datos de contacto. Tú defines qué información comercial o técnica debe aparecer."
      }
    ]
  },
  search: {
    title: "{product} impresas en {locality} | {company}",
    description:
      "Impresión de {product} para ventas y presentaciones de productos. Cotiza formato y cantidad por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description: "{product} para tus ventas. {benefit}. Cotiza por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
