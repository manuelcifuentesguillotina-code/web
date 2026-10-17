import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";

async function rendererFiles(directory, prefix = "") {
  const files = [];
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries.sort((left, right) =>
    left.name < right.name ? -1 : left.name > right.name ? 1 : 0,
  )) {
    const name = entry.name;
    const relative = prefix + name;
    const url = new URL(name, directory);
    if (entry.isDirectory())
      files.push(
        ...(await rendererFiles(
          new URL(name + "/", directory),
          relative + "/",
        )),
      );
    else if (
      entry.isFile() &&
      /\.(?:tsx?|css)$/.test(name) &&
      !name.includes(".test.")
    )
      files.push([relative, await readFile(url)]);
  }
  return files;
}

export async function buildSharingRevisions(
  root = new URL("../../", import.meta.url),
) {
  const renderer = await rendererFiles(
    new URL("src/contexts/commercial-presence/presentation/sharing/", root),
  );
  const fixedInputs = [
    "public/fonts/anton-regular.ttf",
    "src/contexts/commercial-presence/presentation/styles/tokens.css",
  ];
  const layout = createHash("sha256");
  for (const [name, bytes] of renderer)
    layout.update(name).update("\0").update(bytes);
  for (const name of fixedInputs)
    layout
      .update(name)
      .update("\0")
      .update(await readFile(new URL(name, root)));
  const layoutRevision = layout.digest("hex");
  const artworkDirectory = new URL("public/artwork/", root);
  /** @type {Record<string, string>} */
  const assets = {};
  for (const name of (await readdir(artworkDirectory))
    .filter((file) => file.endsWith(".svg"))
    .sort()) {
    assets["/artwork/" + name] = createHash("sha256")
      .update(layoutRevision)
      .update(await readFile(new URL(name, artworkDirectory)))
      .digest("hex");
  }
  if (!Object.keys(assets).length) throw new Error("Difusión sin recursos SVG");
  const output = new URL(
    "src/contexts/commercial-presence/infrastructure/sharing/generated/",
    root,
  );
  await mkdir(output, { recursive: true });
  const manifest = { format: 1, assets };
  await writeFile(
    new URL("artwork-revisions.json", output),
    JSON.stringify(manifest, null, 2) + "\n",
  );
  return manifest;
}
