import { outlineText } from "./type-outlines.mjs";

export function text(
  x,
  y,
  value,
  size = 18,
  fill = "currentColor",
  extra = "",
) {
  return outlineText(x, y, value, size, fill, extra);
}

export function lines(x, y, widths, color, gap = 12) {
  return widths
    .map(
      (width, index) =>
        '<rect x="' +
        x +
        '" y="' +
        (y + index * gap) +
        '" width="' +
        width +
        '" height="3" fill="' +
        color +
        '" opacity=".34"/>',
    )
    .join("");
}

export function registration(x, y, color) {
  return (
    '<g stroke="' +
    color +
    '" stroke-width="1" opacity=".5"><path d="M' +
    (x - 12) +
    " " +
    y +
    "h24M" +
    x +
    " " +
    (y - 12) +
    'v24"/><circle cx="' +
    x +
    '" cy="' +
    y +
    '" r="6" fill="none"/></g>'
  );
}

export function rays(cx, cy, radius, color) {
  return (
    '<g stroke="' +
    color +
    '" stroke-width="2">' +
    Array.from({ length: 36 }, (_, index) => {
      const a = (index * Math.PI) / 18;
      return (
        '<path d="M' +
        (cx + Math.cos(a) * radius).toFixed(2) +
        " " +
        (cy + Math.sin(a) * radius).toFixed(2) +
        "l" +
        (Math.cos(a) * 14).toFixed(2) +
        " " +
        (Math.sin(a) * 14).toFixed(2) +
        '"/>'
      );
    }).join("") +
    "</g>"
  );
}

export function monogram(x, y, scale, color) {
  return (
    '<g transform="translate(' +
    x +
    " " +
    y +
    ") scale(" +
    scale +
    ')" fill="' +
    color +
    '"><path d="M0 48V0h12l16 25L44 0h12v48H41V25L28 45 15 25v23Z"/></g>'
  );
}

export function paper(
  x,
  y,
  width,
  height,
  content,
  angle = 0,
  fill = "url(#paper)",
) {
  return (
    '<g transform="translate(' +
    x +
    " " +
    y +
    ") rotate(" +
    angle +
    " " +
    width / 2 +
    " " +
    height / 2 +
    ')" filter="url(#shadow)"><rect x="0" y="5" width="' +
    width +
    '" height="' +
    height +
    '" rx="1" fill="#b9a58a"/><rect width="' +
    width +
    '" height="' +
    height +
    '" rx="1" fill="' +
    fill +
    '" stroke="#ffffff" stroke-opacity=".4"/>' +
    content +
    '<path d="M1 1H' +
    (width - 1) +
    '" stroke="#fff" stroke-opacity=".65"/></g>'
  );
}

export function document(
  title,
  content,
  palette,
  dark = false,
  size = "1000 800",
) {
  const background = dark ? palette.ink : palette.paper;
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' +
    size +
    '" fill="none" role="img">' +
    "<title>" +
    title +
    "</title><desc>Composición vectorial ilustrativa de productos impresos. No es una fotografía de trabajos realizados.</desc>" +
    '<defs><linearGradient id="paper" x1="0" y1="0" x2="1" y2="1"><stop stop-color="' +
    palette.surface +
    '"/><stop offset="1" stop-color="' +
    palette.warm +
    '"/></linearGradient>' +
    '<linearGradient id="orange" x1="0" y1="0" x2="1" y2="1"><stop stop-color="' +
    palette.highlight +
    '"/><stop offset=".45" stop-color="' +
    palette.accent +
    '"/><stop offset="1" stop-color="' +
    palette.rust +
    '"/></linearGradient>' +
    '<radialGradient id="floor"><stop stop-color="' +
    palette.warm +
    '"/><stop offset="1" stop-color="' +
    background +
    '"/></radialGradient><filter id="shadow" x="-60%" y="-60%" width="220%" height="240%">' +
    '<feDropShadow dx="9" dy="20" stdDeviation="15" flood-color="' +
    palette.ink +
    '" flood-opacity=".24"/>' +
    '</filter><filter id="soft"><feGaussianBlur stdDeviation="16"/></filter>' +
    '<pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0v60" stroke="' +
    palette.ink +
    '" stroke-opacity=".035"/></pattern></defs>' +
    '<rect width="100%" height="100%" fill="' +
    background +
    '"/>' +
    '<rect width="100%" height="100%" fill="url(#grid)"/>' +
    content +
    "</svg>\n"
  );
}
