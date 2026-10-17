import type { CatalogService } from "../../application/content";

export const services = [
  { id: "printing", name: "Imprenta corporativa", description: "Diseño, impresión y terminaciones.", mediaId: "printing-main" },
  { id: "cutting", name: "Corte con guillotina", description: "Corte para tus materiales e impresos.", mediaId: "cutting-main" },
] satisfies readonly CatalogService[];
