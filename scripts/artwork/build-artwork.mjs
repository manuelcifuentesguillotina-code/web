import { mkdir, writeFile } from "node:fs/promises";
import { loadPalette } from "./palette.mjs";
import { hero, printing, cutting, productScenes } from "./scenes.mjs";
import { monogram } from "./primitives.mjs";

const palette = await loadPalette();
const directory = new URL("../../public/artwork/", import.meta.url);
await mkdir(directory, { recursive: true });
const scenes = { hero: hero(palette), printing: printing(palette), cutting: cutting(palette), ...productScenes(palette) };
scenes.brand = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><title>Monograma</title>'
  + '<path d="M0 0h80v80H0z" fill="' + palette.accent + '"/>'
  + monogram(12, 16, 1, palette.ink) + '</svg>\n';
await Promise.all(Object.entries(scenes).map(([name, svg]) => writeFile(new URL(name + ".svg", directory), svg)));
console.log("SVG generados: " + Object.keys(scenes).length);
