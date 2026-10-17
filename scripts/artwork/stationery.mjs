import { lines, monogram, paper, text } from "./primitives.mjs";

export function card(x, y, p, angle = -12, dark = false) {
  const ink = dark ? p.surface : p.ink;
  const content = monogram(28, 28, 0.8, dark ? p.accent : p.ink)
    + text(28, 122, "TU MARCA.", 29, ink, 'font-weight="900" letter-spacing="-1"')
    + lines(28, 145, [110, 75], ink, 9)
    + '<circle cx="242" cy="36" r="10" fill="' + p.accent + '"/>'
    + text(225, 169, "01", 12, ink);
  return paper(x, y, 290, 185, content, angle, dark ? p.ink : "url(#paper)");
}

export function folder(x, y, p, angle = 10) {
  const content = '<path d="M0 0h300v405H0z" fill="' + p.accent + '"/>'
    + '<path d="M0 270 300 90v180L0 405Z" fill="' + p.rust + '" opacity=".38"/>'
    + monogram(26, 30, 1.2, p.surface)
    + text(24, 195, "TU", 61, p.surface, 'font-weight="900"')
    + text(24, 257, "EMPRESA.", 42, p.surface, 'font-weight="900" letter-spacing="-2"')
    + text(26, 376, "PRESENTACIÓN CORPORATIVA", 10, p.surface, 'letter-spacing="2"')
    + '<path d="M299 0v405" stroke="' + p.rust + '" stroke-width="4" opacity=".4"/>';
  return paper(x, y, 300, 405, content, angle);
}

export function letterhead(x, y, p, angle = -7) {
  return paper(x, y, 300, 420, monogram(28, 28, 0.65, p.accent)
    + text(198, 44, "TU EMPRESA", 10, p.ink, 'font-weight="700"')
    + '<path d="M28 95h245" stroke="' + p.accent + '"/>'
    + text(28, 139, "Una buena", 25, p.ink, 'font-weight="700"')
    + text(28, 169, "presentación.", 25, p.ink, 'font-weight="700"')
    + lines(28, 202, [239, 245, 224, 245, 181, 0, 245, 224, 160], p.ink, 13)
    + '<path d="M28 370h245" stroke="' + p.accent + '"/>'
    + text(28, 391, "IDENTIDAD EN CADA DOCUMENTO", 8, p.ink, 'letter-spacing="1"'), angle);
}

export function envelope(x, y, p, angle = -8) {
  return paper(x, y, 385, 220,
    '<path d="m0 0 192 132L385 0" fill="' + p.warm + '" stroke="' + p.ink + '" stroke-opacity=".12"/>'
    + '<path d="M0 220 145 110M385 220 240 110" stroke="' + p.ink + '" stroke-opacity=".12"/>'
    + monogram(28, 154, 0.5, p.accent)
    + text(255, 190, "TU EMPRESA", 11, p.ink, 'font-weight="700"'), angle);
}

export function pad(x, y, p, angle = -9) {
  const rows = Array.from({ length: 7 }, (_, i) => '<path d="M24 ' + (143 + i * 26) + 'h267" stroke="' + p.ink + '" stroke-opacity=".16"/>').join("");
  const leaves = Array.from({ length: 8 }, (_, i) => '<rect x="' + (x + i) + '" y="' + (y + 12 - i) + '" width="315" height="370" fill="' + p.warm + '" stroke="' + p.surface + '"/>').join("");
  return '<g transform="rotate(' + angle + ' 500 400)">' + leaves
    + paper(x, y, 315, 370, '<rect width="315" height="16" fill="' + p.ink + '"/>'
    + monogram(24, 32, 0.6, p.accent)
    + text(190, 55, "N.º 0001", 16, p.ink, 'font-weight="700"')
    + text(24, 112, "ORDEN DE TRABAJO", 18, p.ink, 'font-weight="700"')
    + rows + '<path d="M215 143v156" stroke="' + p.ink + '" stroke-opacity=".16"/>'
    + text(24, 339, "TU EMPRESA / REGISTROS", 9, p.ink)) + "</g>";
}
