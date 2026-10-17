import { expect, test } from "@playwright/test";
import {
  expectBriefContent,
  expectContact,
} from "./support/landing-assertions";

test("mobile hero gives contact a full row and keeps the artwork compact", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    const hero = page.locator("#inicio");
    const offer = hero.locator(".hero-offer");
    const contact = offer.locator(".contact-link");
    const browse = hero.getByRole("link", { name: "Ver productos" });
    const offerBox = (await offer.boundingBox())!;
    const contactBox = (await contact.boundingBox())!;
    const browseBox = (await browse.boundingBox())!;
    const headingBox = (await hero.getByRole("heading", { level: 1 }).boundingBox())!;
    expect(offerBox.width).toBeCloseTo(headingBox.width, 0);
    expect(contactBox.width).toBeCloseTo(offerBox.width, 0);
    expect(contactBox.height).toBeGreaterThanOrEqual(44);
    expect(browseBox.height).toBeGreaterThanOrEqual(44);
    expect(browseBox.y).toBeGreaterThanOrEqual(contactBox.y + contactBox.height);
    const artwork = (await hero.locator("figure").boundingBox())!;
    expect(artwork.height).toBeLessThanOrEqual(280);
    expect(artwork.y).toBeGreaterThanOrEqual(browseBox.y + browseBox.height);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
});

test("phone, landscape and tablet keep touch navigation, compact cards and a clear footer", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [
    { width: 320, height: 667 },
    { width: 844, height: 390 },
    { width: 1024, height: 768 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const actions = page.getByRole("navigation", { name: "Acciones móviles" });
    await expect(actions).toBeInViewport();
    const bar = (await actions.boundingBox())!;
    const reserve = await page
      .locator("body")
      .evaluate((body) => parseFloat(getComputedStyle(body).paddingBottom));
    expect(reserve).toBeGreaterThanOrEqual(bar.height);
    if (viewport.width === 320) {
      const card = (await page.locator(".product-card").first().boundingBox())!;
      expect(card.height).toBeLessThan(260);
    }
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(
      page.locator("footer").getByRole("link", { name: "Cómo llegar" }),
    ).toBeInViewport();
    await expectBriefContent(page);
    await actions.getByRole("link", { name: "Productos", exact: true }).click();
    const finder = page.getByRole("dialog");
    await expect(finder).toBeInViewport();
    await expect(
      finder.getByRole("button", { name: "Cerrar productos" }),
    ).toBeInViewport();
    await expect(finder.locator(".contact-link").last()).toBeInViewport();
    await finder.getByRole("button", { name: "Cerrar productos" }).click();
    await expect(finder).not.toBeVisible();
  }
});

test("a shrinking visual viewport keeps search, close and quote above the simulated keyboard", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Acciones móviles" })
    .getByRole("link", { name: "Productos", exact: true })
    .click();
  const finder = page.getByRole("dialog");
  await finder.getByRole("searchbox").focus();
  await page.evaluate(() => {
    const viewport = window.visualViewport!;
    Object.defineProperty(viewport, "height", {
      configurable: true,
      value: 360,
    });
    viewport.dispatchEvent(new Event("resize"));
  });
  await expect(finder).toHaveAttribute("data-compact-viewport", "");
  const bounds = (await finder.boundingBox())!;
  expect(bounds.y).toBeGreaterThanOrEqual(0);
  expect(bounds.y + bounds.height).toBeLessThanOrEqual(361);
  for (const control of [
    finder.getByRole("searchbox"),
    finder.getByRole("button", { name: "Cerrar productos" }),
    finder.locator(".contact-link").last(),
  ]) {
    const box = (await control.boundingBox())!;
    expect(box.y + box.height).toBeLessThanOrEqual(361);
    expect(box.height).toBeGreaterThanOrEqual(44);
  }
  await finder.getByRole("searchbox").fill("triptico");
  await expect(
    finder.getByRole("link", { name: "Trípticos", exact: true }),
  ).toBeVisible();
});

test("unknown work returns a real 404 and retains catalog, directions and WhatsApp without scripts", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 667 },
  });
  try {
    const page = await context.newPage();
    for (const prefix of ["productos", "servicios", "trabajos", "proyectos"]) {
      const path = "/" + prefix + "/ningun-trabajo";
      const response = await page.goto("http://127.0.0.1:3100" + path);
      expect(response?.status()).toBe(404);
      expect(new URL(page.url()).pathname).toBe(path);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Trabajo no encontrado.",
      );
    }
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Trabajo no encontrado.",
    );
    await expectContact(page.locator("main .contact-link"));
    await expect(
      page.locator("footer").getByRole("link", { name: "Cómo llegar" }),
    ).toHaveAttribute("href", /^https:\/\/www.google.com\/maps\/dir\//);
    await page
      .locator("main")
      .getByRole("link", { name: "Ver productos" })
      .click();
    await expect(page).toHaveURL(/\/#productos$/);
    await expect(page.locator("#productos h2")).toBeInViewport();
  } finally {
    await context.close();
  }
});
