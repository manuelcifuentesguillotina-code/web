import { expect, test, type Page } from "@playwright/test";

async function expectBriefContent(page: Page): Promise<void> {
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
  const longBlocks = await page.locator(".short-copy").evaluateAll((elements) =>
    elements.filter((element) => {
      if (!element.getClientRects().length) return false;
      const lineHeight = Number.parseFloat(getComputedStyle(element).lineHeight);
      return element.getBoundingClientRect().height > lineHeight * 2 + 2;
    }).map((element) => element.textContent),
  );
  expect(longBlocks).toEqual([]);
}

test("commercial offer, services and native contact work without JavaScript", async ({ browser, page }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: page.viewportSize() });
  const noJs = await context.newPage();
  try {
    const response = await noJs.goto("http://127.0.0.1:3100/");
    expect(response?.status()).toBe(200);
    const html = await response?.text();
    expect(html).toContain("quiero mi descuento de 20%");
    await expect(noJs.getByRole("heading", { name: "Imprenta corporativa", exact: true })).toBeVisible();
    await expect(noJs.getByRole("heading", { name: "Corte con guillotina", exact: true })).toBeVisible();
    const card = noJs.locator(".product-card").first();
    await card.locator("summary").click();
    await expect(card.getByRole("textbox", { name: "Mensaje para Manolo" }))
      .toHaveValue("quiero mi descuento de 20%\nMe interesa: Tarjetas de presentación");
    await expect(card.getByText("Placeholder: WhatsApp por confirmar.")).toBeVisible();
    await card.getByRole("link", { name: "Ver Tarjetas de presentación" }).click();
    await expect(noJs.getByRole("heading", { level: 1 })).toHaveText("Tarjetas de presentación");
  } finally {
    await context.close();
  }
});

test("every published product link resolves to its own complete landing and canonical metadata", async ({ page }) => {
  await page.goto("/");
  const links = await page.getByRole("link", { name: /^Ver / }).evaluateAll((items) =>
    items.map((item) => ({ href: item.getAttribute("href"), name: item.getAttribute("aria-label")?.replace(/^Ver /, "") })),
  );
  expect(links.length).toBeGreaterThan(0);
  expect(new Set(links.map((item) => item.href)).size).toBe(links.length);
  for (const link of links) {
    if (!link.href || !link.name) throw new Error("Producto sin URL o nombre");
    const response = await page.goto(link.href);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(link.name);
    await expect(page).toHaveTitle(link.name + " | Manolo Imprenta y Corte");
    await expect(page.locator('link[rel="canonical"]'))
      .toHaveAttribute("href", "https://manoloimprenta.cl" + link.href);
    await expectBriefContent(page);
    await page.locator(".product-offer summary").click();
    await expect(page.locator(".product-offer textarea"))
      .toHaveValue("quiero mi descuento de 20%\nMe interesa: " + link.name);
    await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
    await expect(page.locator('a[href^="https://wa.me/"]')).toHaveCount(0);
  }
});

test("unknown products return 404 and preview is not indexed", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  const response = await page.goto("/productos/no-existe");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Producto no encontrado." })).toBeVisible();
});

test("contact is keyboard accessible and content fits in supported viewports", async ({ page }) => {
  await page.goto("/");
  const contact = page.locator(".hero-offer summary");
  await contact.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".hero-offer textarea")).toBeVisible();
  await expectBriefContent(page);
  await page.getByRole("link", { name: "Ver Tarjetas de presentación" }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
});
