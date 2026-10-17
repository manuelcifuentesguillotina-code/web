import type { MediaView } from "../../contracts";

function artwork(
  id: string,
  filename: string,
  label: string,
  size = 1000,
): MediaView {
  return {
    id,
    status: "ready",
    src: "/artwork/" + filename + ".svg",
    label,
    width: size,
    height: size === 80 ? 80 : 800,
  };
}

export const media: readonly MediaView[] = [
  artwork("brand-logo", "brand", "Monograma gráfico", 80),
  artwork(
    "corporate-hero",
    "hero",
    "Composición ilustrada de papelería corporativa",
  ),
  artwork(
    "printing-main",
    "printing",
    "Diseño, impresión y terminaciones: ilustración",
  ),
  artwork("cutting-main", "cutting", "Corte de papel e impresos: ilustración"),
  artwork("cards-image", "cards", "Tarjetas de presentación: ilustración"),
  artwork("folders-image", "folders", "Carpetas corporativas: ilustración"),
  artwork("letterheads-image", "letterheads", "Hojas membretadas: ilustración"),
  artwork("envelopes-image", "envelopes", "Sobres corporativos: ilustración"),
  artwork("pads-image", "pads", "Talonarios: ilustración"),
  artwork("catalogs-image", "catalogs", "Catálogos de productos: ilustración"),
  artwork("leaflets-image", "leaflets", "Folletos: ilustración"),
  artwork("bifolds-image", "bifolds", "Dípticos: ilustración"),
  artwork("trifolds-image", "trifolds", "Trípticos: ilustración"),
  artwork("sheets-image", "sheets", "Fichas comerciales: ilustración"),
];
