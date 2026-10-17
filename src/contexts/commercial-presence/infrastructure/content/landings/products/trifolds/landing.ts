import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const trifoldsLanding = {
  productId: "trifolds",
  slug: "tripticos",
  editorial: {
    "intro": "Una historia en seis caras. Trípticos para ordenar información y guiar la lectura de tu propuesta paso a paso.",
    "uses": [
      "Presentación de empresas y servicios.",
      "Campañas informativas.",
      "Guías breves de productos."
    ],
    "preparation": [
      "Indica tamaño abierto, tiraje y uso de la pieza.",
      "Comparte el contenido de las seis caras o el diseño disponible.",
      "Consulta el tipo de plegado antes de cerrar el archivo."
    ],
    "faqs": [
      {
        "question": "¿Qué diferencia a un tríptico de un díptico?",
        "answer": "El tríptico tiene tres paneles y seis caras. El díptico tiene dos paneles y cuatro caras."
      },
      {
        "question": "¿Cómo preparo el orden de las caras?",
        "answer": "Comparte el tipo de plegado que buscas. La posición de portada, contraportada e interiores depende de cómo se cierre la pieza."
      }
    ]
  },
  search: {
    title: "{product} para campañas en {locality} | {company}",
    description:
      "Impresión de {product} plegados para campañas y presentaciones de empresa. Cotiza tu proyecto por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description:
      "{product} impresos y plegados. {benefit}. Hablemos por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
