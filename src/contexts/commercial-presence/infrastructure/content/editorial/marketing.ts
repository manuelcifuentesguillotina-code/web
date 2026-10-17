import type { MarketingCopy } from "../../../contracts";
export const marketing = {
  finder: {
    search: "Buscar producto",
    clear: "Limpiar búsqueda",
    close: "Cerrar productos",
    empty: "No encontramos ese producto.",
    singular: "producto",
    plural: "productos",
  },
  navigation: {
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
