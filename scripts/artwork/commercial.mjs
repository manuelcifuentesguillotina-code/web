import { lines, monogram, paper, text } from "./primitives.mjs";

export function catalog(x, y, p, angle = 9) {
  const leaves =
    '<path d="M6 9h302v413H6z" fill="' +
    p.warm +
    '"/><path d="M10 412h293" stroke="' +
    p.surface +
    '" stroke-width="5"/>';
  const cover =
    '<rect width="300" height="410" fill="' +
    p.ink +
    '"/>' +
    '<circle cx="270" cy="175" r="147" fill="url(#orange)"/>' +
    '<circle cx="270" cy="175" r="80" fill="' +
    p.ink +
    '"/>' +
    '<path d="m100 80 205 205" stroke="' +
    p.surface +
    '" stroke-opacity=".25"/>' +
    monogram(28, 27, 0.6, p.surface) +
    text(
      27,
      291,
      "CATÁLOGO",
      36,
      p.surface,
      'font-weight="900" letter-spacing="-1"',
    ) +
    text(28, 322, "TU PRÓXIMA", 14, p.surface, 'letter-spacing="3"') +
    text(28, 346, "GRAN IDEA.", 14, p.surface, 'letter-spacing="3"') +
    text(
      28,
      387,
      "PRODUCTOS / TU EMPRESA",
      8,
      p.surface,
      'letter-spacing="1.5"',
    ) +
    '<path d="M7 0v410" stroke="' +
    p.surface +
    '" stroke-opacity=".15" stroke-width="2"/>';
  return (
    '<g transform="translate(' +
    x +
    " " +
    y +
    ") rotate(" +
    angle +
    ' 150 200)">' +
    leaves +
    paper(0, 0, 300, 410, cover) +
    "</g>"
  );
}

export function folded(x, y, p, panels = 3, angle = -8) {
  const width = panels === 3 ? 510 : 420;
  const panelWidth = width / panels;
  let content = "";
  for (let i = 0; i < panels; i++) {
    const left = i * panelWidth;
    const fill = i === 0 ? p.ink : i === 1 ? p.accent : p.surface;
    const foreground = i < 2 ? p.surface : p.ink;
    content +=
      '<rect x="' +
      left +
      '" width="' +
      panelWidth +
      '" height="350" fill="' +
      fill +
      '"/>' +
      '<path d="M' +
      left +
      ' 0v350" stroke="' +
      p.ink +
      '" stroke-opacity=".2"/>' +
      monogram(left + 20, 25, 0.55, foreground) +
      text(
        left + 20,
        164,
        i === 0 ? "TU" : i === 1 ? "MARCA" : "AQUÍ.",
        29,
        foreground,
        'font-weight="900"',
      ) +
      lines(
        left + 20,
        200,
        [panelWidth - 45, panelWidth - 55, panelWidth - 70, panelWidth - 45],
        foreground,
        12,
      ) +
      text(left + 20, 319, "0" + (i + 1), 11, foreground);
  }
  return paper(x, y, width, 350, content, angle);
}

export function leaflet(x, y, p, angle = -9, technical = false) {
  let content =
    '<rect x="0" y="0" width="300" height="190" fill="' +
    p.accent +
    '"/>' +
    '<circle cx="270" cy="0" r="140" stroke="' +
    p.rust +
    '" stroke-width="38"/>' +
    monogram(24, 25, 0.6, p.surface) +
    text(
      24,
      144,
      technical ? "LO ESENCIAL." : "HABLEMOS",
      28,
      p.surface,
      'font-weight="900"',
    ) +
    text(
      24,
      176,
      technical ? "TU PRODUCTO." : "DE TU MARCA.",
      23,
      p.surface,
      'font-weight="900"',
    ) +
    lines(24, 227, [248, 235, 245, 178], p.ink, 13);
  if (technical)
    content +=
      '<g stroke="' +
      p.ink +
      '" stroke-opacity=".17"><path d="M24 300h250M24 328h250M24 356h250M175 300v84"/></g>';
  else
    content +=
      '<rect x="24" y="306" width="101" height="70" fill="' +
      p.ink +
      '"/><rect x="139" y="306" width="135" height="70" fill="' +
      p.warm +
      '"/>';
  return paper(x, y, 300, 410, content, angle);
}
