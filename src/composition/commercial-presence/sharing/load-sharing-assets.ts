import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
export async function loadSharingAssets(artworkPath: string) {
  const [font, artwork, tokens] = await Promise.all([
    readFile(join(root, "public/fonts/anton-regular.ttf")),
    readFile(join(root, "public", artworkPath)),
    readFile(
      join(
        root,
        "src/contexts/commercial-presence/presentation/styles/tokens.css",
      ),
      "utf8",
    ),
  ]);
  const token = (name: string): string => {
    const value = tokens.match(
      new RegExp("--color-" + name + ":\\s*(#[a-fA-F0-9]{6})"),
    )?.[1];
    if (!value) throw new Error("Token de difusión inexistente: " + name);
    return value;
  };
  return {
    font,
    artwork: "data:image/svg+xml;base64," + artwork.toString("base64"),
    palette: {
      ink: token("ink"),
      paper: token("paper"),
      accent: token("accent"),
      warm: token("warm"),
    },
  };
}
