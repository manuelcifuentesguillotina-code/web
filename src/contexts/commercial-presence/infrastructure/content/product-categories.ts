import type { ProductCategory } from "../../application/content";

export const productCategories = [
  { id: "corporate-stationery", name: "Papelería corporativa", serviceId: "printing" },
  { id: "commercial-material", name: "Catálogos y material comercial", serviceId: "printing" },
] satisfies readonly ProductCategory[];
