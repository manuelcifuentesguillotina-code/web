import { expect, test, type Locator, type Page } from "@playwright/test";
import type { CompanyContent } from "../../src/contexts/commercial-presence/application/publication/content";
import { company } from "../../src/contexts/commercial-presence/infrastructure/content/company";

function configuredNumber(phone: CompanyContent["phone"]): string {
  if (phone.status !== "ready") throw new Error("El recorrido de despliegue exige WhatsApp confirmado.");
  return phone.international.replace(/\D/g, "");
}

async function expectContact(link: Locator, subject?: string): Promise<void> {
  await expect(link).toBeVisible();
  const href = await link.getAttribute("href");
  if (!href) throw new Error("Contacto sin destino");
  const url = new URL(href);
  expect(url.origin).toBe("https://wa.me");
  expect(url.pathname).toBe("/" + configuredNumber(company.phone));
  expect(url.searchParams.get("text")).toBe(
    "quiero mi descuento de 20%" + (subject ? "\nMe interesa: " + subject : ""),
  );
}

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
    await expect(noJs.getByText("20% de descuento", { exact: true })).toBeVisible();
    await expect(noJs.getByRole("heading", { name: "Imprenta corporativa", exact: true })).toBeVisible();
    await expect(noJs.getByRole("heading", { name: "Corte con guillotina", exact: true })).toBeVisible();
    const card = noJs.locator(".product-card").first();
    await expectContact(card.locator(".contact-link"), "Tarjetas de presentación");
    await expect(noJs.locator(".hero-offer .contact-link")).toHaveAttribute("target", "_blank");
    await expect(noJs.locator(".pending-contact")).toHaveCount(0);
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
    await expectContact(page.locator(".product-offer .contact-link"), link.name);
    await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
    await expect(page.locator(".pending-contact")).toHaveCount(0);
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
  const contact = page.locator(".hero-offer .contact-link");
  await contact.focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  await expect(contact).toBeFocused();
  await expectContact(contact);
  await expectBriefContent(page);
  await page.getByRole("link", { name: "Ver Tarjetas de presentación" }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
});
