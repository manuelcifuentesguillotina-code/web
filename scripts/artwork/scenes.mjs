import { document, registration, text, rays } from "./primitives.mjs";
import { card, envelope, folder, letterhead, pad } from "./stationery.mjs";
import { catalog, folded, leaflet } from "./commercial.mjs";

export function hero(p) {
  const floor =
    '<ellipse cx="510" cy="625" rx="330" ry="85" fill="' +
    p.ink +
    '" opacity=".12" filter="url(#soft)"/>' +
    '<circle cx="565" cy="390" r="295" fill="' +
    p.accent +
    '"/>' +
    rays(565, 390, 325, p.warm);
  const objects =
    folder(500, 140, p, 14) +
    letterhead(160, 180, p, -16) +
    catalog(365, 288, p, -7) +
    envelope(450, 550, p, 9) +
    card(155, 550, p, -15, true) +
    card(125, 478, p, -12);
  return document(
    "Identidad corporativa en papel",
    floor +
      objects +
      registration(75, 80, p.ink) +
      registration(925, 720, p.ink),
    p,
  );
}

export function productScenes(p) {
  return {
    cards: document(
      "Tarjetas de presentación",
      card(370, 220, p, 15, true) + card(220, 380, p, -12),
      p,
    ),
    folders: document(
      "Carpetas corporativas",
      folder(245, 190, p, -13) + folder(480, 225, p, 13),
      p,
    ),
    letterheads: document(
      "Hojas membretadas",
      letterhead(230, 190, p, -12) + letterhead(470, 220, p, 11),
      p,
    ),
    envelopes: document(
      "Sobres corporativos",
      envelope(375, 220, p, 13) + envelope(190, 420, p, -9),
      p,
    ),
    pads: document("Talonarios corporativos", pad(310, 220, p), p),
    catalogs: document(
      "Catálogos de productos",
      catalog(195, 180, p, -12) + catalog(500, 215, p, 12),
      p,
    ),
    leaflets: document(
      "Folletos comerciales",
      leaflet(215, 180, p, -14) + leaflet(470, 235, p, 11),
      p,
    ),
    bifolds: document("Dípticos corporativos", folded(205, 230, p, 2, -9), p),
    trifolds: document("Trípticos corporativos", folded(230, 230, p, 3, 10), p),
    sheets: document(
      "Fichas comerciales",
      leaflet(215, 210, p, -12, true) + leaflet(475, 180, p, 11, true),
      p,
    ),
  };
}

export function printing(p) {
  return document(
    "Diseño, impresión y terminaciones",
    folder(560, 150, p, 14) +
      folded(100, 210, p, 3, -8) +
      card(240, 520, p, -14, true) +
      registration(80, 80, p.ink) +
      registration(920, 720, p.ink),
    p,
  );
}

export function cutting(p) {
  const sheets = Array.from(
    { length: 14 },
    (_, i) =>
      '<path d="m180 ' +
      (440 + i * 5) +
      ' 420-120 230 150-420 120Z" fill="' +
      (i % 2 ? p.warm : p.surface) +
      '" stroke="' +
      p.ink +
      '" stroke-opacity=".12"/>',
  ).join("");
  const top =
    '<path d="m180 440 420-120 230 150-420 120Z" fill="url(#paper)"/>' +
    '<path d="m240 443 330-95 170 111-330 95Z" fill="' +
    p.accent +
    '"/>' +
    '<g stroke="' +
    p.surface +
    '" stroke-opacity=".6"><path d="m320 420 170 111m-110-128 170 111m-105-130 170 111"/></g>' +
    '<path d="m654 196 22-7 117 330-25 9Z" fill="url(#paper)" filter="url(#shadow)"/>' +
    '<path d="m654 196 114 332 21-9-113-330Z" fill="' +
    p.accent +
    '" opacity=".5"/>' +
    '<path d="m660 300 92 270" stroke="' +
    p.accent +
    '" stroke-dasharray="8 8" stroke-width="2"/>' +
    text(90, 115, "CORTE / PRECISIÓN", 15, p.paper, 'letter-spacing="4"') +
    registration(90, 680, p.surface) +
    registration(900, 100, p.surface);
  return document(
    "Corte de papel e impresos",
    '<ellipse cx="500" cy="620" rx="340" ry="60" fill="#000" opacity=".35" filter="url(#soft)"/>' +
      sheets +
      top,
    p,
    true,
  );
}
