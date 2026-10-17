import type { TopicDefinition } from "../../../application/publication/discovery-content";

export const localPage = {
  id: "santiago-centro",
  kind: "local",
  path: "/imprenta-santiago-centro",
  name: "Imprenta en Santiago Centro",
  heading: "Imprenta en\nSantiago Centro.",
  lead: "Impresión y corte. Todo resuelto.",
  mediaId: "corporate-hero",
  selection: { serviceId: "printing" },
  selectionHeading: "Elige tu trabajo",
  search: {
    title: "Imprenta en Santiago Centro | {company}",
    description:
      "Impresión, corte con guillotina y encuadernación para empresas en Santiago Centro. Visítanos en {address}. Cotiza por WhatsApp.",
  },
} satisfies TopicDefinition;
