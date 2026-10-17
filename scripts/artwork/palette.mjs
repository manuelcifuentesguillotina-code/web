import { readFile } from "node:fs/promises";

export async function loadPalette() {
  const source = await readFile(
    new URL(
      "../../src/contexts/commercial-presence/presentation/styles/tokens.css",
      import.meta.url,
    ),
    "utf8",
  );
  const names = [
    "paper",
    "surface",
    "ink",
    "accent",
    "warm",
    "highlight",
    "rust",
  ];
  return Object.fromEntries(
    names.map((name) => {
      const value = source.match(
        new RegExp("--color-" + name + ":\\s*(#[a-fA-F0-9]{6})"),
      )?.[1];
      if (!value) throw new Error("Falta el token visual: " + name);
      return [name, value];
    }),
  );
}
