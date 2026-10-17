import { readFileSync } from "node:fs";
import { create } from "fontkit";

const master = create(
  readFileSync(
    new URL("../../public/fonts/manrope-variable.ttf", import.meta.url),
  ),
);
const variations = new Map();

export function outlineText(x, y, value, size, fill, attributes = "") {
  const weight = Math.min(
    800,
    Math.max(200, Number(attributes.match(/font-weight="(\d+)"/)?.[1] ?? 400)),
  );
  const spacing = Number(
    attributes.match(/letter-spacing="(-?[\d.]+)"/)?.[1] ?? 0,
  );
  const unsupported = attributes
    .replace(/(?:font-weight|letter-spacing)="[^"]+"/g, "")
    .trim();
  if (unsupported)
    throw new Error("Atributo tipográfico sin resolver: " + unsupported);
  for (const character of value) {
    if (!master.hasGlyphForCodePoint(character.codePointAt(0)))
      throw new Error("Glifo no disponible: " + character);
  }
  if (!variations.has(weight))
    variations.set(weight, master.getVariation({ wght: weight }));
  const font = variations.get(weight);
  const run = font.layout(value);
  const scale = size / font.unitsPerEm;
  let penX = 0;
  let penY = 0;
  const paths = run.glyphs
    .map((glyph, index) => {
      const position = run.positions[index];
      const path = glyph.path.toSVG();
      const offsetX = ((penX + position.xOffset) * scale).toFixed(4);
      const offsetY = (-(penY + position.yOffset) * scale).toFixed(4);
      penX += position.xAdvance + spacing / scale;
      penY += position.yAdvance;
      return path
        ? '<path transform="translate(' +
            offsetX +
            " " +
            offsetY +
            ") scale(" +
            scale +
            " " +
            -scale +
            ')" d="' +
            path +
            '"/>'
        : "";
    })
    .join("");
  return (
    '<g transform="translate(' +
    x +
    " " +
    y +
    ')" fill="' +
    fill +
    '" data-type-outline="true">' +
    paths +
    "</g>"
  );
}
