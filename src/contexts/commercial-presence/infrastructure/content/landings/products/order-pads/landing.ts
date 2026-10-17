import type { ProductLandingDefinition } from "../../../../../application/publication/product-landing-content";

export const orderPadsLanding = {
  productId: "order-pads",
  slug: "talonarios",
  editorial: {
    "intro": "Mantén tus registros a mano. Talonarios impresos para organizar órdenes y conservar una copia de la información.",
    "uses": [
      "Órdenes de trabajo y servicio.",
      "Registros internos de entrega.",
      "Formularios de uso cotidiano."
    ],
    "preparation": [
      "Comparte un ejemplo del formulario o los campos que necesitas.",
      "Indica cantidad de talonarios y copias por juego.",
      "Consulta las opciones de numeración y armado que requiere tu registro."
    ],
    "faqs": [
      {
        "question": "¿Qué información debo enviar para cotizar talonarios?",
        "answer": "Envía formato, cantidad de talonarios, copias por juego y un ejemplo del contenido."
      },
      {
        "question": "¿Puedo usar un formulario propio?",
        "answer": "Comparte tu archivo o una referencia. Revisaremos la distribución y los datos necesarios para preparar la impresión."
      }
    ]
  },
  search: {
    title: "{product} con copia en {locality} | {company}",
    description:
      "Impresión de {product} para órdenes y registros con copia. Cotiza cantidad y formato por WhatsApp en {locality}.",
  },
  social: {
    title: "{product}",
    description: "{product} con copia. {benefit}. Cotiza por WhatsApp.",
  },
} satisfies ProductLandingDefinition;
