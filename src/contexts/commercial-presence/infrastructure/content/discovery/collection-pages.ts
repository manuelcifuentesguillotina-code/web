import type { TopicDefinition } from "../../../application/publication/discovery-content";

export const collectionPages = [
  {
    id: "stationery",
    kind: "collection",
    path: "/trabajos/papeleria",
    name: "Papelería",
    heading: "Tu marca.\nEn papel.",
    lead: "Papelería para empresas.",
    mediaId: "corporate-hero",
    selection: { categoryId: "corporate-stationery" },
    selectionHeading: "Papelería impresa",
    search: {
      title: "Papelería para empresas en Santiago | {company}",
      description:
        "Tarjetas, carpetas, hojas membretadas, sobres y talonarios con tu marca. Papelería impresa para empresas. Cotiza por WhatsApp.",
    },
  },
  {
    id: "printed-advertising",
    kind: "collection",
    path: "/trabajos/publicidad-impresa",
    name: "Publicidad impresa",
    heading: "Ideas que\nse imprimen.",
    lead: "Publicidad para vender.",
    mediaId: "catalogs-image",
    selection: { categoryId: "commercial-material" },
    selectionHeading: "Material de venta",
    search: {
      title: "Publicidad impresa para empresas | {company}",
      description:
        "Catálogos, folletos, dípticos, trípticos y fichas comerciales. Material impreso para campañas y ventas. Cotiza cantidades por WhatsApp.",
    },
  },
] satisfies readonly TopicDefinition[];
