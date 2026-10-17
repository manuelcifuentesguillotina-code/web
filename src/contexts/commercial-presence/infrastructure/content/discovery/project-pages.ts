import type { TopicDefinition } from "../../../application/publication/discovery-content";

export const projectPages = [
  {
    id: "large-print-runs",
    kind: "project",
    path: "/proyectos/grandes-tirajes",
    name: "Grandes tirajes",
    heading: "Proyectos\ngráficos grandes.",
    lead: "Campañas. Catálogos. Papelería.",
    mediaId: "printing-main",
    selection: {
      productIds: ["catalogs", "folders", "leaflets", "bifolds", "trifolds"],
    },
    selectionHeading: "Para grandes proyectos",
    search: {
      title: "Grandes tirajes y proyectos gráficos | {company}",
      description:
        "Impresión para campañas y proyectos gráficos de grandes cantidades. Catálogos, carpetas y material publicitario. Planifica tu trabajo por WhatsApp.",
    },
  },
  {
    id: "small-print-runs",
    kind: "project",
    path: "/proyectos/pequenas-cantidades",
    name: "Pequeñas cantidades",
    heading: "Pequeños\ngrandes trabajos.",
    lead: "Tu proyecto también cuenta.",
    mediaId: "cards-image",
    selection: {
      productIds: ["business-cards", "order-pads", "bifolds", "trifolds"],
    },
    selectionHeading: "Para partir",
    search: {
      title: "Impresión en pequeñas cantidades | {company}",
      description:
        "Tarjetas, talonarios, dípticos y trípticos en cantidades evaluadas por proyecto. Consulta la cantidad de tu trabajo por WhatsApp. Santiago Centro.",
    },
  },
] satisfies readonly TopicDefinition[];
