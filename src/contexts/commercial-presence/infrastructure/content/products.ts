import type { CatalogProduct } from "../../application/content";

export const products = [
  {
    id: "business-cards", name: "Tarjetas de presentación",
    description: "Tu marca en cada presentación.",
    categoryId: "corporate-stationery", mediaId: "cards-image",
    typicalQuantity: { amount: 100, unit: "unidades" },
  },
  {
    id: "folders", name: "Carpetas corporativas",
    description: "Propuestas y documentos con tu marca.",
    categoryId: "corporate-stationery", mediaId: "folders-image",
    typicalQuantity: { amount: 100, unit: "unidades" },
  },
  {
    id: "letterheads", name: "Hojas membretadas",
    description: "Identidad para tus documentos.",
    categoryId: "corporate-stationery", mediaId: "letterheads-image",
  },
  {
    id: "envelopes", name: "Sobres corporativos",
    description: "Tu marca desde la primera entrega.",
    categoryId: "corporate-stationery", mediaId: "envelopes-image",
  },
  {
    id: "order-pads", name: "Talonarios",
    description: "Registros para la operación de tu empresa.",
    categoryId: "corporate-stationery", mediaId: "pads-image",
    typicalQuantity: { amount: 1, unit: "talonario", composition: "50 × 2 unidades" },
  },
  {
    id: "catalogs", name: "Catálogos de productos",
    description: "Tus productos, bien presentados.",
    categoryId: "commercial-material", mediaId: "catalogs-image",
  },
  {
    id: "leaflets", name: "Folletos",
    description: "Tu propuesta comercial, impresa.",
    categoryId: "commercial-material", mediaId: "leaflets-image",
  },
  {
    id: "bifolds", name: "Dípticos",
    description: "Espacio para presentar tu propuesta.",
    categoryId: "commercial-material", mediaId: "bifolds-image",
    typicalQuantity: { amount: 100, unit: "unidades" },
  },
  {
    id: "trifolds", name: "Trípticos",
    description: "Tu información comercial, organizada.",
    categoryId: "commercial-material", mediaId: "trifolds-image",
    typicalQuantity: { amount: 100, unit: "unidades" },
  },
  {
    id: "sales-sheets", name: "Fichas comerciales",
    description: "Lo esencial de tus productos y servicios.",
    categoryId: "commercial-material", mediaId: "sheets-image",
  },
] satisfies readonly CatalogProduct[];
