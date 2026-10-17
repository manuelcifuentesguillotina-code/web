import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 320, height: 667 }, reducedMotion: "reduce" });

test("double text size reflows content and reserves the enlarged navigation height", async ({
  page,
}) => {
  await page.goto("/");
  const actions = page.getByRole("navigation", { name: "Acciones móviles" });
  const original = (await actions.boundingBox())!;
  await page.addStyleTag({ content: "html { font-size: 200% }" });
  await expect
    .poll(async () => (await actions.boundingBox())!.height)
    .toBeGreaterThan(original.height);
  await expect
    .poll(() =>
      page
        .locator("body")
        .evaluate((body) => parseFloat(getComputedStyle(body).paddingBottom)),
    )
    .toBeGreaterThanOrEqual((await actions.boundingBox())!.height);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    320,
  );
  await page.locator(".product-card").first().scrollIntoViewIfNeeded();
  expect(
    await page
      .locator("footer h2")
      .evaluate((title) => title.scrollWidth - title.clientWidth),
  ).toBeLessThanOrEqual(1);
  expect(
    await page
      .locator(".product-card h3")
      .first()
      .evaluate((title) => title.scrollWidth - title.clientWidth),
  ).toBeLessThanOrEqual(1);
  await actions.getByRole("link", { name: "Productos", exact: true }).click();
  const finder = page.getByRole("dialog");
  const close = finder.getByRole("button", { name: "Cerrar productos" });
  const bounds = (await close.boundingBox())!;
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(320);
  await expect(finder.locator(".contact-link").last()).toBeInViewport();
  await close.click();
  await expect(finder).not.toBeVisible();
});
