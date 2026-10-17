import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { buildSharingRevisions } from "../../../../../scripts/sharing/build-sharing-revisions.mjs";

const directories: string[] = [];
afterEach(async () => {
  await Promise.all(
    directories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

describe("social asset manifest", () => {
  it("tracks actual SVG, renderer, font and palette bytes with deterministic output", async () => {
    const directory = await mkdtemp(tmpdir() + "/manolo-sharing-");
    directories.push(directory);
    const root = pathToFileURL(directory + "/");
    const write = async (path: string, value: string) => {
      const file = new URL(path, root);
      await mkdir(new URL("./", file), { recursive: true });
      await writeFile(file, value);
    };
    const renderer =
      "src/contexts/commercial-presence/presentation/sharing/card.parts/card.tsx";
    const palette =
      "src/contexts/commercial-presence/presentation/styles/tokens.css";
    await write(renderer, "renderer-v1");
    await write(palette, "palette-v1");
    await write("public/fonts/anton-regular.ttf", "font-v1");
    await write("public/artwork/cards.svg", "cards-v1");
    await write("public/artwork/folders.svg", "folders-v1");
    const original = await buildSharingRevisions(root);
    expect(await buildSharingRevisions(root)).toEqual(original);
    await write("public/artwork/cards.svg", "cards-v2");
    const changed = await buildSharingRevisions(root);
    expect(changed.assets["/artwork/cards.svg"]).not.toBe(
      original.assets["/artwork/cards.svg"],
    );
    expect(changed.assets["/artwork/folders.svg"]).toBe(
      original.assets["/artwork/folders.svg"],
    );
    let previous = changed;
    for (const path of [renderer, palette, "public/fonts/anton-regular.ttf"]) {
      await write(path, "updated-bytes");
      const next = await buildSharingRevisions(root);
      for (const key of Object.keys(previous.assets))
        expect(next.assets[key]).not.toBe(previous.assets[key]);
      previous = next;
    }
  });
});
