import type { TopicDefinition } from "../../../application/publication/discovery-content";

export const servicePages = [
  {
    id: "printing",
    kind: "service",
    path: "/servicios/impresion",
    name: "Impresión",
    heading: "Impresión\nrobusta.",
    lead: "Diseño. Impresión. Encuadernación.",
    mediaId: "printing-main",
    serviceId: "printing",
    selection: { serviceId: "printing" },
    selectionHeading: "Trabajos impresos",
    search: {
      title: "Impresión para empresas en Santiago | {company}",
      description:
        "Servicio de impresión, diseño, encuadernación y terminaciones. Papelería, catálogos y publicidad impresa. Cotiza tu proyecto por WhatsApp.",
    },
  },
  {
    id: "guillotine-cutting",
    kind: "service",
    path: "/servicios/corte-con-guillotina",
    name: "Corte con guillotina",
    heading: "Corte con\nguillotina.",
    lead: "Papel e impresos. A tu medida.",
    mediaId: "cutting-main",
    serviceId: "cutting",
    selection: { productIds: ["business-cards", "leaflets", "sales-sheets"] },
    selectionHeading: "También imprimimos",
    search: {
      title: "Corte con guillotina en Santiago Centro | {company}",
      description:
        "Servicio de corte con guillotina para papel e impresos de empresas y otras imprentas. Visítanos en {address}. Cotiza por WhatsApp.",
    },
  },
] satisfies readonly TopicDefinition[];
