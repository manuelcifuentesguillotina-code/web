import { expect, test } from "@playwright/test";
import {
  expectBriefContent,
  expectContact,
} from "./support/landing-assertions";

test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

test("find a product without scrolling and retain its WhatsApp context", async ({
  page,
}) => {
  await page.goto("/");
  const actions = page.getByRole("navigation", { name: "Acciones móviles" });
  await expectContact(actions.locator(".contact-link"));
  await actions.getByRole("link", { name: "Productos", exact: true }).click();
  const finder = page.getByRole("dialog", { name: "Productos", exact: true });
  await expect(finder).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await finder.getByRole("searchbox").fill("triptico");
  await expect(
    finder.getByRole("link", { name: "Trípticos", exact: true }),
  ).toBeVisible();
  await finder.getByRole("link", { name: "Trípticos", exact: true }).click();
  await expect(page).toHaveURL(/\/productos\/tripticos$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Trípticos");
  await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
  await expectContact(actions.locator(".contact-link"), "Trípticos");
  await expect(finder).not.toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "visible");
  await expectBriefContent(page);
});

test("empty search keeps contact available and closing restores position and focus", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".product-card").first().scrollIntoViewIfNeeded();
  const before = await page.evaluate(() => scrollY);
  const browse = page
    .getByRole("navigation", { name: "Acciones móviles" })
    .getByRole("link", { name: "Productos", exact: true });
  await browse.click();
  const finder = page.getByRole("dialog");
  await finder.getByRole("searchbox").fill("xxxxxxxxxxx");
  await expect(finder.getByText("No encontramos ese producto.")).toBeVisible();
  await expectContact(finder.locator(".contact-link"));
  await finder.getByRole("button", { name: "Limpiar búsqueda" }).click();
  await expect(finder.getByRole("searchbox")).toHaveValue("");
  await expect(finder.getByText("10 productos", { exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(finder).not.toBeVisible();
  await expect(browse).toBeFocused();
  expect(Math.abs((await page.evaluate(() => scrollY)) - before)).toBeLessThan(
    3,
  );
  await expect(page.locator("body")).toHaveCSS("overflow", "visible");
});

test("native mobile navigation works without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 667 },
    hasTouch: true,
  });
  try {
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3100/");
    const actions = page.getByRole("navigation", { name: "Acciones móviles" });
    await expectContact(actions.locator(".contact-link"));
    await actions.getByRole("link", { name: "Productos", exact: true }).click();
    await expect(page).toHaveURL(/#productos$/);
    await expect(page.locator("#productos h2")).toBeInViewport();
    await expectBriefContent(page);
  } finally {
    await context.close();
  }
});

test("finder touch targets fit small screens and browser back restores the catalog", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 667 });
  await page.goto("/");
  const card = page.locator(".product-card").first();
  await card.scrollIntoViewIfNeeded();
  await card
    .getByRole("link", { name: "Ver Tarjetas de presentación", exact: true })
    .click();
  await expect(page).toHaveURL(/tarjetas-de-presentacion$/);
  await page.goBack();
  await expect(card).toBeInViewport();
  await page
    .getByRole("navigation", { name: "Acciones móviles" })
    .getByRole("link", { name: "Productos", exact: true })
    .click();
  const finder = page.getByRole("dialog");
  await expect(finder).toBeVisible();
  for (const control of [
    finder.getByRole("button", { name: "Cerrar productos" }),
    finder.getByRole("link", { name: "Tarjetas de presentación", exact: true }),
  ]) {
    const box = await control.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
  await finder
    .getByRole("link", { name: "Fichas comerciales", exact: true })
    .scrollIntoViewIfNeeded();
  await expect(finder.locator(".contact-link").last()).toBeInViewport();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
});
