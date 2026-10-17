import { describe, expect, it } from "vitest";
import type { ContactDestinationResolver } from "../ports/contact-destination";
import type { SiteContent } from "../publication/content";
import { createPresence } from "./create-presence";
import { contentFixture } from "../publication/content.fixture";

const pending: ContactDestinationResolver = {
  resolve: () => ({ status: "pending", reason: "phone-unconfirmed" }),
};
function application(content: SiteContent = contentFixture()) {
  return createPresence({ load: () => content }, pending);
}

describe("commercial presence", () => {
  it("preserves contact and benefit on all commercial entries with a pending number", () => {
    const app = application();
    const home = app.home();
    const contacts = [
      home.company.contact,
      ...home.services.map((item) => item.contact),
      ...home.groups.flatMap((group) =>
        group.products.map((item) => item.contact),
      ),
    ];
    for (const contact of contacts) {
      expect(contact.destination.status).toBe("pending");
      expect(contact.message).toContain("quiero mi descuento de 20%");
      expect(contact.message.split("\n").length).toBeLessThanOrEqual(2);
      expect(contact.benefit.percent).toBe(20);
    }
  });

  it("derives renamed product, SEO and message from one catalog change", () => {
    const original = contentFixture();
    const app = application({
      ...original,
      products: original.products.map((item) =>
        item.id === "card" ? { ...item, name: "Tarjetas nuevas" } : item,
      ),
    });
    const view = app.productLanding("tarjetas");
    expect(view?.product.id).toBe("card");
    expect(view?.product.contact.message).toContain("Tarjetas nuevas");
    expect(view?.seo.title).toContain("Tarjetas nuevas");
    expect(app.home().groups[0].products[0].name).toBe("Tarjetas nuevas");
  });

  it("derives company and address changes in every landing", () => {
    const original = contentFixture();
    const app = application({
      ...original,
      company: {
        ...original.company,
        name: "Nuevo nombre",
        address: { ...original.company.address, number: "99" },
      },
    });
    expect(app.home().company.visit).toContain("99");
    expect(app.productLanding("tarjetas")?.company.visit).toBe(
      app.home().company.visit,
    );
    expect(app.productLanding("tarjetas")?.seo.title).toContain("Nuevo nombre");
  });

  it("changes quantities independently of contact and discount", () => {
    const original = contentFixture();
    const changed = application({
      ...original,
      products: original.products.map((item) => ({
        ...item,
        typicalQuantity: { amount: 250, unit: "unidades" },
      })),
    }).productLanding("tarjetas");
    const before = application(original).productLanding("tarjetas");
    expect(changed?.product.quantity).toBe("250 unidades");
    expect(changed?.product.contact).toEqual(before?.product.contact);
  });

  it("changes the shared offer for every consumer", () => {
    const original = contentFixture();
    const app = application({
      ...original,
      offer: { ...original.offer, percent: 15 },
    });
    expect(app.home().company.contact.message).toContain("15%");
    expect(app.home().services[1].contact.benefit.percent).toBe(15);
    expect(app.productLanding("catalogos")?.product.contact.label).toContain(
      "15%",
    );
  });

  it("replaces a placeholder at its source without changing product references", () => {
    const original = contentFixture();
    const first = original.media[0];
    const replacement = {
      id: first.id,
      status: "ready",
      src: "/trabajos/tarjetas.webp",
      label: "Tarjetas corporativas",
      width: 1200,
      height: 900,
    } satisfies SiteContent["media"][number];
    const app = application({
      ...original,
      media: original.media.map((item) =>
        item.id === first.id ? replacement : item,
      ),
    });
    expect(app.productLanding("tarjetas")?.product.media).toEqual(replacement);
    expect(app.home().heroMedia).toEqual(replacement);
    expect(app.home().groups[0].products[0].id).toBe("card");
  });

  it("updates shared editorial copy without redefining products", () => {
    const original = contentFixture();
    const copy = {
      ...original.copy,
      product: { ...original.copy.product, back: "Ver catálogo" },
    };
    const app = application({ ...original, copy });
    expect(app.home().copy).toEqual(copy);
    expect(app.productLanding("tarjetas")?.copy).toEqual(copy);
    expect(app.home().groups[0].products[0].name).toBe(
      original.products[0].name,
    );
  });

  it("keeps product identities independent of editorial order and category labels", () => {
    const original = contentFixture();
    const app = application({
      ...original,
      home: { ...original.home, categoryOrder: ["commercial", "stationery"] },
      categories: original.categories.map((item) => ({
        ...item,
        name: "Mismo título",
      })),
    });
    expect(app.home().groups[0].products[0].id).toBe("catalog");
    expect(app.productLanding("tarjetas")?.related).toEqual([]);
    expect(app.productSlugs()).toEqual(["tarjetas", "catalogos"]);
    expect(app.productLanding("desconocido")).toBeUndefined();
  });
});
