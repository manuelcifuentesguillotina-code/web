import type { SiteContent } from "../../application/publication/content";

export const media = [
  { id: "brand-logo", status: "placeholder", label: "Logo por definir" },
  { id: "printing-main", status: "placeholder", label: "Impresión corporativa" },
  { id: "cutting-main", status: "placeholder", label: "Corte con guillotina" },
  { id: "cards-image", status: "placeholder", label: "Tarjetas" },
  { id: "folders-image", status: "placeholder", label: "Carpetas" },
  { id: "letterheads-image", status: "placeholder", label: "Hojas membretadas" },
  { id: "envelopes-image", status: "placeholder", label: "Sobres" },
  { id: "pads-image", status: "placeholder", label: "Talonarios" },
  { id: "catalogs-image", status: "placeholder", label: "Catálogos" },
  { id: "leaflets-image", status: "placeholder", label: "Folletos" },
  { id: "bifolds-image", status: "placeholder", label: "Dípticos" },
  { id: "trifolds-image", status: "placeholder", label: "Trípticos" },
  { id: "sheets-image", status: "placeholder", label: "Fichas comerciales" },
] satisfies SiteContent["media"];
