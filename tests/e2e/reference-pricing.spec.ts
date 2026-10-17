import { expect, test } from "@playwright/test";
import {
  expectBriefContent,
  expectContact,
} from "./support/landing-assertions";

test("external references retain provenance and native disclosure without becoming business offers", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 667 },
    reducedMotion: "reduce",
  });
  try {
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3100/productos/tarjetas-de-presentacion");
    const price = page.locator('main [data-price-status="reference"]').first();
    await expect(
      price.getByText("Referencia $98.663", { exact: true }),
    ).toBeVisible();
    await expect(
      price.getByText("500 tarjetas · IVA incluido", { exact: true }),
    ).toBeVisible();
    await price
      .getByText("Referencia externa · Play Express", { exact: true })
      .click();
    await expect(
      price.getByText("Precio final por WhatsApp.", { exact: true }),
    ).toBeVisible();
    await expect(
      price.getByRole("link", { name: "Ver fuente · 17/10/2026" }),
    ).toHaveAttribute(
      "href",
      "https://playexpress.cl/productos/tarjeta-de-presentacion-premium",
    );
    await expectContact(
      page.locator(".product-offer .contact-link"),
      "Tarjetas de presentación",
    );
    const graph = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(graph).not.toContain('"Offer"');
    await expectBriefContent(page);
    await page.goto("http://127.0.0.1:3100/productos/catalogos-de-productos");
    await expect(
      page.locator('main [data-price-status="quote"]').first(),
    ).toHaveText("Precio por proyecto");
  } finally {
    await context.close();
  }
});
