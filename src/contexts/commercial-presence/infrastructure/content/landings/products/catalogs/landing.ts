import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const catalogsLanding = {
  productId: "catalogs",
  slug: "catalogos-de-productos",
  editorial: {
    "intro": "Tu oferta merece más que una pantalla. Catálogos impresos para recorrer productos y acompañar conversaciones de venta.",
    "uses": [
      "Presentaciones de líneas de productos.",
      "Material de apoyo comercial.",
      "Exhibiciones y reuniones con clientes."
    ],
    "preparation": [
      "Indica formato, cantidad de páginas y tiraje estimado.",
      "Comparte el archivo o el contenido que quieres organizar.",
      "Cuéntanos cómo se usará para consultar papel y encuadernación."
    ],
    "faqs": [
      {
        "question": "¿Qué determina la cotización de un catálogo?",
        "answer": "El formato, las páginas, la cantidad, el papel y la encuadernación. Comparte esos datos, aunque algunos estén por definir."
      },
      {
        "question": "¿Puedo consultar sin tener todas las páginas?",
        "answer": "Indica una cantidad estimada de páginas y explica el uso del catálogo. La cotización se ajustará al definir el proyecto."
      }
    ]
  },
  search: {
    title: "Impresión de {product} en {locality} | {company}",
    description:
      "Impresión y encuadernación de {product} para ventas y presentaciones. Cotiza tu tiraje por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description:
      "{product} impresos y encuadernados. {benefit}. Hablemos por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
