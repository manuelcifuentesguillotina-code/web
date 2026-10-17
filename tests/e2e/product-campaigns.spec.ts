import { expect, test } from "@playwright/test";
import {
  expectBriefContent,
  expectContact,
} from "./support/landing-assertions";

test("ten campaign destinations show product, price and WhatsApp before scrolling, including social bots without JavaScript", async ({
  browser,
}) => {
  test.setTimeout(60000);
  const context = await browser.newContext({
    javaScriptEnabled: false,
    userAgent: "WhatsApp/2.24.1",
    viewport: { width: 320, height: 667 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  try {
    await page.goto("http://127.0.0.1:3100/");
    const paths = await page
      .locator(".product-card a[aria-label^='Ver ']")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    expect(paths).toHaveLength(10);
    for (const path of paths) {
      if (!path) throw new Error("Producto sin destino");
      const response = await page.goto(
        "http://127.0.0.1:3100" +
          path +
          "?utm_source=campaign&utm_campaign=producto",
      );
      expect(response?.status(), path).toBe(200);
      const name = await page.locator("h1").textContent();
      if (!name) throw new Error("Producto sin nombre");
      const contact = page.locator(".product-offer .contact-link");
      await expectContact(contact, name);
      await expectBriefContent(page);
      const box = await contact.boundingBox();
      const navigation = await page
        .getByRole("navigation", { name: "Acciones móviles" })
        .boundingBox();
      if (!box || !navigation)
        throw new Error("Contacto o navegación sin superficie");
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.y + box.height, path).toBeLessThanOrEqual(navigation.y);
      await expect(
        page.locator("main [data-price-status]").first(),
      ).toBeInViewport();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        "https://manoloimprenta.cl" + path,
      );
      await expect(
        page.locator('head meta[property="og:title"]'),
      ).toHaveAttribute("content", name);
      await expect(
        page.locator('head meta[property="og:description"]'),
      ).toHaveAttribute("content", new RegExp(name));
      const image = await page
        .locator('head meta[property="og:image"]')
        .getAttribute("content");
      expect(image).toMatch(
        /^https:\/\/manoloimprenta\.cl\/compartir\/[a-z-]+\?v=[a-f0-9]{20}$/,
      );
      await expect(
        page.locator('head meta[name="twitter:image"]'),
      ).toHaveAttribute("content", image!);
      expect(await page.locator("main").innerText()).not.toMatch(
        /\bcalidad\b|\bprecisión\b/i,
      );
    }
  } finally {
    await context.close();
  }
});
