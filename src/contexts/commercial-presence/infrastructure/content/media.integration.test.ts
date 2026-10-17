// @vitest-environment jsdom
import { readFile } from "node:fs/promises";
import { expect, it } from "vitest";
import { media } from "./media";

it("publishes complete local vector artwork with the declared proportions", async () => {
  for (const item of media) {
    expect(item.status).toBe("ready");
    if (item.status !== "ready")
      throw new Error("Ilustración pendiente: " + item.id);
    expect(item.src).toMatch(/^\/artwork\/[a-z]+\.svg$/);
    const source = await readFile(
      new URL("../../../../../public" + item.src, import.meta.url),
      "utf8",
    );
    const document = new DOMParser().parseFromString(source, "image/svg+xml");
    expect(document.querySelector("parsererror")).toBeNull();
    const svg = document.documentElement;
    expect(svg.localName).toBe("svg");
    expect(svg.getAttribute("viewBox")).toBe(
      `0 0 ${item.width} ${item.height}`,
    );
    expect(document.querySelector("title")?.textContent).toBeTruthy();
    expect(document.querySelector("script, image, foreignObject")).toBeNull();
    for (const element of document.querySelectorAll("[href]")) {
      expect(element.getAttribute("href")).toMatch(/^#/);
    }
  }
});
