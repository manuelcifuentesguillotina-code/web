import type { MarketingCopy } from "../../../contracts";

export const marketing = {
  navigation: { products: "Productos", services: "Imprenta y corte", visit: "Visítanos" },
  hero: {
    eyebrow: "Impresión para empresas",
    browse: "Explorar productos",
    artCaption: "Productos ilustrados. Tu marca va aquí.",
  },
  services: { eyebrow: "Dos especialidades. Un solo lugar.", heading: "Del diseño\na tus manos." },
  catalog: {
    eyebrow: "Hecho para tu empresa",
    heading: "Tu próximo proyecto\nempieza aquí.",
    detail: "Elige tu producto. Conversemos por WhatsApp.",
  },
  process: {
    eyebrow: "De principio a fin",
    heading: "Un proyecto.\nTodo resuelto.",
    steps: [
      { id: "conversation", title: "Cuéntanos tu proyecto.", detail: "Conversemos por WhatsApp." },
      { id: "proposal", title: "Definimos el trabajo.", detail: "Una cotización para tu proyecto." },
      { id: "production", title: "Recibe tu producto.", detail: "Impresión y terminaciones resueltas." },
    ],
  },
  footer: { eyebrow: "Hagamos tu próximo trabajo", heading: "Tu próximo\ntrabajo, aquí.", channel: "Cotiza por WhatsApp" },
  product: { back: "Todos los productos", quantity: "Cantidad orientativa", related: "También para tu empresa" },
  ribbon: ["Diseño", "Impresión", "Terminaciones", "Corte"],
} satisfies MarketingCopy;
