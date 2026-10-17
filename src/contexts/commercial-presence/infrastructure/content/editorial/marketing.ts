import type { MarketingCopy } from "../../../contracts";
export const marketing = {
  finder: {
    all: "Todos",
    categories: "Filtrar productos",
    opening: "Abriendo…",
    shortcuts: "Servicios y ubicación",
    search: "Buscar producto",
    clear: "Limpiar búsqueda",
    close: "Cerrar productos",
    empty: "No encontramos ese producto.",
    singular: "producto",
    plural: "productos",
  },
  navigation: {
    directions: "Cómo llegar",
    products: "Productos",
    services: "Imprenta y corte",
    visit: "Visítanos",
  },
  hero: { browse: "Ver productos" },
  services: { heading: "Impresión y corte." },
  catalog: { heading: "Elige tu trabajo." },
  footer: { heading: "Imprimamos." },
  product: { related: "Más trabajos" },
  ribbon: ["Diseño", "Impresión", "Encuadernación", "Corte"],
} satisfies MarketingCopy;
