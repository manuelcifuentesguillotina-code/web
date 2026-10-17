import type { ProductCategory } from "../../../application/publication/content";

export const productCategories = [
  { id: "corporate-stationery", name: "Papelería", serviceId: "printing" },
  {
    id: "commercial-material",
    name: "Catálogos y material comercial",
    serviceId: "printing",
  },
] satisfies readonly ProductCategory[];
