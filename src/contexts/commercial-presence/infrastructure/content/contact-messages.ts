import type { ContactTemplates } from "../../application/content";

export const contactMessages = {
  request: "quiero mi descuento de {percent}%",
  product: "Me interesa: {product}",
  action: "Quiero mi {percent}%",
  benefit: "{percent}% de descuento",
  pending: "Placeholder: WhatsApp por confirmar.",
  visit: "Visítanos en {address}",
  production: "Base: {days} días hábiles.\nConfirma por WhatsApp.",
} satisfies ContactTemplates;
