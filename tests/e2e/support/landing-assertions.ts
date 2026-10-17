import { expect, type Locator, type Page } from "@playwright/test";
import type { CompanyContent } from "../../../src/contexts/commercial-presence/application/publication/content";
import { company } from "../../../src/contexts/commercial-presence/infrastructure/content/company";

function configuredNumber(phone: CompanyContent["phone"]): string {
  if (phone.status !== "ready")
    throw new Error("El recorrido de despliegue exige WhatsApp confirmado.");
  return phone.international.replace(/\D/g, "");
}

export async function expectContact(
  link: Locator,
  subject?: string,
): Promise<void> {
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

export async function expectBriefContent(page: Page): Promise<void> {
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    ),
  ).toBe(false);
  const longBlocks = await page.locator(".short-copy").evaluateAll((elements) =>
    elements
      .filter((element) => {
        if (!element.getClientRects().length) return false;
        const lineHeight = Number.parseFloat(
          getComputedStyle(element).lineHeight,
        );
        return element.getBoundingClientRect().height > lineHeight * 2 + 2;
      })
      .map((element) => element.textContent),
  );
  expect(longBlocks).toEqual([]);
}
