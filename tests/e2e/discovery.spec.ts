import { expect, test } from "@playwright/test";
import {
  expectBriefContent,
  expectContact,
} from "./support/landing-assertions";

test("all eighteen commercial destinations expose unique metadata and crawlable relationships", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const paths = await page
    .locator('a[href^="/"]')
    .evaluateAll((links) => [
      ...new Set(
        links
          .map((link) => link.getAttribute("href")?.split("#")[0])
          .filter((href): href is string => Boolean(href)),
      ),
    ]);
  expect(paths).toHaveLength(18);
  const titles = new Set<string>();
  const images = new Set<string>();
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main .eyebrow")).toHaveCount(0);
    await expect(page.locator("main figcaption")).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://manoloimprenta.cl" + path,
    );
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
      "content",
      "es_CL",
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    const title = await page.title();
    expect(title).not.toMatch(/corporativ/i);
    expect(titles.has(title), path).toBe(false);
    titles.add(title);
    const image = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    if (!image) throw new Error("Landing sin imagen social: " + path);
    images.add(image);
    const data = JSON.parse(
      await page.locator('script[type="application/ld+json"]').innerText(),
    );
    expect(data["@context"]).toBe("https://schema.org");
    expect(
      data["@graph"].some(
        (item: { "@type": string; url?: string }) =>
          item["@type"].endsWith("Page") &&
          item.url === "https://manoloimprenta.cl" + path,
      ),
    ).toBe(true);
    expect(JSON.stringify(data)).not.toMatch(/aggregateRating/);
    const primaryProduct = data["@graph"].find(
      (item: { "@type": string }) => item["@type"] === "Product",
    );
    if (primaryProduct) {
      expect(primaryProduct.image).toBe(image);
      const approved =
        (await page
          .locator("main [data-price-status]")
          .first()
          .getAttribute("data-price-status")) === "approved";
      expect(Boolean(primaryProduct.offers)).toBe(approved);
    }
    await expectBriefContent(page);
  }
  expect(images.size).toBe(18);
});

test("each landing sharing card is a distinct valid PNG with the advertised dimensions", async ({
  page,
  request,
}) => {
  test.setTimeout(60000);
  await page.goto("/");
  const paths = await page
    .locator('a[href^="/"]')
    .evaluateAll((links) => [
      ...new Set(
        links
          .map((link) => link.getAttribute("href")?.split("#")[0])
          .filter((href): href is string => Boolean(href)),
      ),
    ]);
  const bodies = new Set<string>();
  for (const path of paths) {
    const response = await request.get(path);
    const imagePath = (await response.text()).match(
      /property="og:image" content="https:\/\/manoloimprenta\.cl([^"]+)"/,
    )?.[1];
    if (!imagePath) throw new Error("Imagen social no publicada: " + path);
    expect(imagePath).toMatch(/\?v=[a-f0-9]{20}$/);
    const image = await request.get(imagePath);
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toContain("image/png");
    const body = await image.body();
    expect(body.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(body.readUInt32BE(16)).toBe(1200);
    expect(body.readUInt32BE(20)).toBe(630);
    expect(body.length).toBeLessThan(5 * 1024 * 1024);
    bodies.add(body.toString("base64"));
  }
  expect(bodies.size).toBe(18);
  expect((await request.get("/compartir/no-existe")).status()).toBe(404);
  const icon = await request.get("/apple-icon");
  expect(icon.status()).toBe(200);
  const iconBody = await icon.body();
  expect(iconBody.readUInt32BE(16)).toBe(180);
  expect(iconBody.readUInt32BE(20)).toBe(180);
});

test("preview crawl controls and unknown landing responses agree", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).not.toContain("<loc>");
  for (const path of [
    "/servicios/no-existe",
    "/trabajos/no-existe",
    "/proyectos/no-existe",
  ])
    expect((await request.get(path)).status()).toBe(404);
});

test("topic landings keep WhatsApp and the selected product usable on small phones", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 760 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [path, subject] of [
    ["/servicios/corte-con-guillotina", "Corte con guillotina"],
    ["/proyectos/grandes-tirajes", "Grandes tirajes"],
    ["/imprenta-santiago-centro", "Imprenta en Santiago Centro"],
  ]) {
    await page.goto(path);
    await expectContact(page.locator(".product-offer .contact-link"), subject);
    await expectContact(
      page
        .getByRole("navigation", { name: "Acciones móviles" })
        .locator(".contact-link"),
      subject,
    );
    await expectBriefContent(page);
    const heading = page.locator("h1");
    expect(
      await heading.evaluate(
        (element) =>
          element.getBoundingClientRect().height /
          parseFloat(getComputedStyle(element).lineHeight),
      ),
    ).toBeLessThanOrEqual(2.05);
  }
});
