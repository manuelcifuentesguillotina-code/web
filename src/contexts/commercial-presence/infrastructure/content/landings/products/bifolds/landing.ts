import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const bifoldsLanding = {
  productId: "bifolds",
  slug: "dipticos",
  editorial: {
    "intro": "Abre espacio para tu mensaje. Dípticos impresos y plegados para presentar una propuesta en cuatro caras.",
    "uses": [
      "Presentaciones de servicios.",
      "Campañas con portada e información interior.",
      "Material informativo para reuniones."
    ],
    "preparation": [
      "Indica el tamaño abierto y cerrado, si ya lo definiste.",
      "Comparte cantidad y archivo con las cuatro caras.",
      "Señala el orden de lectura y consulta las opciones de papel."
    ],
    "faqs": [
      {
        "question": "¿Cuántas caras tiene un díptico?",
        "answer": "Un díptico tiene un pliegue y cuatro caras. Considera portada, dos caras interiores y contraportada al preparar el contenido."
      },
      {
        "question": "¿Debo enviar el tamaño abierto o cerrado?",
        "answer": "Lo ideal es indicar ambos. Si aún no los definiste, cuéntanos qué información debe contener la pieza."
      }
    ]
  },
  search: {
    title: "{product} impresos y plegados en {locality} | {company}",
    description:
      "Impresión de {product} para presentar productos y servicios. Diseño, impresión y plegado. Cotiza por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description:
      "{product} impresos y plegados. {benefit}. Cotiza por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
