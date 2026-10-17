import { expect, test } from "@playwright/test";
import {
  expectBriefContent,
  expectContact,
} from "./support/landing-assertions";

test("styles, fonts and SVG artwork survive the production pipeline", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("header")).toHaveCSS("position", "sticky");
  expect(
    await page
      .locator("h1")
      .evaluate((heading) => parseFloat(getComputedStyle(heading).fontSize)),
  ).toBeGreaterThan(42);
  expect(
    await page.evaluate(() =>
      [document.body, document.querySelector("h1")].every((element) => {
        if (!element) return false;
        const family = getComputedStyle(element).fontFamily.split(",")[0].trim().replaceAll('"', "");
        return [...document.fonts].some((font) => font.family.replaceAll('"', "") === family && font.status === "loaded");
      }),
    ),
  ).toBe(true);
  const cards = page.locator(".product-card");
  const first = await cards.nth(0).boundingBox();
  const second = await cards.nth(1).boundingBox();
  if (!first || !second) throw new Error("Catálogo sin dimensiones");
  if ((page.viewportSize()?.width ?? 0) > 1000) {
    expect(second.x).toBeGreaterThan(first.x);
    expect(second.y).toBeCloseTo(first.y);
  } else {
    expect(second.y).toBeGreaterThan(first.y);
  }
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute("src", /^\/artwork\/.*\.svg$/);
    await expect
      .poll(() =>
        image.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await expectBriefContent(page);
  expect(errors).toEqual([]);
});

test("floating contact preserves product context and yields to the footer", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/productos/tarjetas-de-presentacion");
  const dock = page.getByRole("complementary", { name: "Contacto directo" });
  await expect(dock).toHaveCount(0);
  await page.locator(".product-card").first().scrollIntoViewIfNeeded();
  await expect(dock).toBeVisible();
  await expectContact(dock.locator("a"), "Tarjetas de presentación");
  await expectBriefContent(page);
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(dock).toHaveCount(0);
  await expectContact(page.locator("footer .contact-link"));
});

test("small phones and intermediate widths keep complete two-line copy", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/productos/tarjetas-de-presentacion"]) {
      await page.goto(route);
      await expectBriefContent(page);
      await page.locator(".product-card").first().scrollIntoViewIfNeeded();
      await expectBriefContent(page);
    }
  }
});

test("reduced motion preserves visible content and disables artwork rotation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("[data-reveal='pending']")).toHaveCount(0);
  const artwork = page.locator("#inicio figure > div").first();
  await artwork.dispatchEvent("pointermove", {
    pointerType: "mouse",
    clientX: 50,
    clientY: 50,
  });
  await expect(artwork).toHaveCSS("transform", "none");
  await expectBriefContent(page);
});

test("the animated ribbon can be paused without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: "no-preference",
  });
  try {
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3100/");
    const pause = page.getByRole("checkbox", { name: "Pausar movimiento" });
    await pause.check();
    await expect(pause).toBeChecked();
    await expect(pause.locator("~ div").first()).toHaveCSS(
      "animation-play-state",
      "paused",
    );
    await pause.uncheck();
    await expect(pause.locator("~ div").first()).toHaveCSS(
      "animation-play-state",
      "running",
    );
  } finally {
    await context.close();
  }
});
