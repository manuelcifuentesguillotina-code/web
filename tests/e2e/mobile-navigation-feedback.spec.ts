import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });

test("slow product navigation keeps feedback and contact available until the destination arrives", async ({
  page,
}) => {
  let release = () => {};
  const networkGate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/productos/tripticos**", async (route) => {
    if (route.request().headers()["rsc"] === "1") await networkGate;
    await route.continue();
  });
  try {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Acciones móviles" })
      .getByRole("link", { name: "Productos", exact: true })
      .click();
    const finder = page.getByRole("dialog");
    const product = finder.getByRole("link", {
      name: "Trípticos",
      exact: true,
    });
    await product.click();
    await expect(product.locator('[data-pending="true"]')).toBeVisible();
    await expect(product.getByRole("status")).toHaveText("Abriendo…");
    await expect(finder.locator(".contact-link").last()).toBeInViewport();
    release();
    await expect(page).toHaveURL(/\/productos\/tripticos$/);
    await expect(finder).not.toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
  } finally {
    release();
  }
});
