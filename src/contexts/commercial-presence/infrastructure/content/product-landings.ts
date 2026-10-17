import type { SiteContent } from "../../application/content";

export const productLandings = [
  { productId: "business-cards", slug: "tarjetas-de-presentacion" },
  { productId: "folders", slug: "carpetas-corporativas" },
  { productId: "letterheads", slug: "hojas-membretadas" },
  { productId: "envelopes", slug: "sobres-corporativos" },
  { productId: "order-pads", slug: "talonarios" },
  { productId: "catalogs", slug: "catalogos-de-productos" },
  { productId: "leaflets", slug: "folletos" },
  { productId: "bifolds", slug: "dipticos" },
  { productId: "trifolds", slug: "tripticos" },
  { productId: "sales-sheets", slug: "fichas-comerciales" },
] satisfies SiteContent["productLandings"];
