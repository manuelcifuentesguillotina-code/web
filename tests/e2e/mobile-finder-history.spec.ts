import { expect, test } from "@playwright/test";
import { expectContact } from "./support/landing-assertions";

test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

test("Back dismisses the finder and Forward recovers it without polluting the URL", async ({
  page,
}) => {
  await page.goto("/");
  const initialHeading = await page
    .getByRole("heading", { level: 1 })
    .textContent();
  await page.locator(".product-card").first().scrollIntoViewIfNeeded();
  const before = await page.evaluate(() => scrollY);
  const trigger = page
    .getByRole("navigation", { name: "Acciones móviles" })
    .getByRole("link", { name: "Productos", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("searchbox")).not.toBeFocused();
  await expect(page).toHaveURL("/");
  await page.goBack();
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(Math.abs((await page.evaluate(() => scrollY)) - before)).toBeLessThan(
    3,
  );
  await page.goForward();
  await expect(dialog).toBeVisible();
  await dialog.getByRole("link", { name: "Trípticos", exact: true }).click();
  await expect(page).toHaveURL(/\/productos\/tripticos$/);
  await expect(dialog).not.toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL("/");
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    initialHeading!,
  );
});

test("search aliases, category filters and keyboard submit lead directly to a quote", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Acciones móviles" })
    .getByRole("link", { name: "Productos", exact: true })
    .click();
  const finder = page.getByRole("dialog");
  await finder.getByRole("button", { name: "Papelería", exact: true }).click();
  await expect(finder.getByText("5 productos", { exact: true })).toBeVisible();
  await expect(
    finder.getByRole("link", { name: "Catálogos", exact: true }),
  ).toHaveCount(0);
  await finder.getByRole("button", { name: "Todos", exact: true }).click();
  const search = finder.getByRole("searchbox");
  await search.fill("flyers");
  await expect(finder.getByText("1 producto", { exact: true })).toBeVisible();
  await search.press("Enter");
  await expect(
    finder.getByRole("link", { name: "Folletos", exact: true }),
  ).toBeFocused();
  await expectContact(
    finder.getByRole("link", { name: /Quiero mi 20% · Folletos/ }),
    "Folletos",
  );
  await finder.getByRole("button", { name: "Limpiar búsqueda" }).click();
  await expect(search).toBeFocused();
  await expect(search).toHaveValue("");
});

test("the active work survives every quote entry and selecting it only dismisses the finder", async ({
  page,
}) => {
  await page.goto("/productos/tripticos");
  await expectContact(page.locator("header .contact-link"), "Trípticos");
  const actions = page.getByRole("navigation", { name: "Acciones móviles" });
  await expectContact(actions.locator(".contact-link"), "Trípticos");
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expectContact(page.locator("footer .contact-link"), "Trípticos");
  await actions.getByRole("link", { name: "Productos", exact: true }).click();
  const finder = page.getByRole("dialog");
  await expectContact(finder.locator(".contact-link").last(), "Trípticos");
  await finder.getByRole("link", { name: "Trípticos", exact: true }).click();
  await expect(finder).not.toBeVisible();
  await expect(page).toHaveURL(/\/productos\/tripticos$/);
});

test("cutting and directions are available before scrolling the product list", async ({
  page,
}) => {
  await page.goto("/servicios/corte-con-guillotina");
  const trigger = page
    .getByRole("navigation", { name: "Acciones móviles" })
    .getByRole("link", { name: "Productos", exact: true });
  await trigger.click();
  const finder = page.getByRole("dialog");
  const shortcuts = finder.getByRole("navigation", {
    name: "Servicios y ubicación",
  });
  await expect(shortcuts).toBeInViewport();
  const directions = shortcuts.getByRole("link", { name: "Cómo llegar" });
  const url = new URL((await directions.getAttribute("href"))!);
  expect(url.searchParams.get("destination")).toContain(
    "Eleuterio Ramírez 644",
  );
  expect(url.searchParams.get("api")).toBe("1");
  await shortcuts.getByRole("link", { name: "Corte con guillotina" }).click();
  await expect(finder).not.toBeVisible();
  await trigger.click();
  await finder.getByRole("link", { name: "Impresión", exact: true }).click();
  await expect(page).toHaveURL(/\/servicios\/impresion$/);
  await expect(finder).not.toBeVisible();
  await expectContact(
    page
      .getByRole("navigation", { name: "Acciones móviles" })
      .locator(".contact-link"),
    "Impresión",
  );
});
