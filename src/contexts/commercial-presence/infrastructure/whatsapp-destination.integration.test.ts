import { describe, expect, it } from "vitest";
import { createWhatsAppDestination } from "./whatsapp-destination";
import { createVersionedContentSource } from "./versioned-content-source";
import { createPresence } from "../application/create-presence";

describe("real contact adapter", () => {
  it("normalizes the destination and encodes accents, symbols and line breaks", () => {
    const message = "quiero mi descuento de 20%\nMe interesa: Dípticos & más";
    const result = createWhatsAppDestination().resolve({ status: "ready", international: "+44 7700 900123" }, message);
    expect(result.status).toBe("ready");
    if (result.status !== "ready") throw new Error("Destino no resuelto");
    const url = new URL(result.href);
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/447700900123");
    expect(url.searchParams.get("text")).toBe(message);
  });
  it("rejects invalid numbers instead of silently changing the channel", () => {
    expect(() => createWhatsAppDestination().resolve({ status: "ready", international: "desconocido" }, "Hola"))
      .toThrow("inválido");
    expect(createWhatsAppDestination().resolve({ status: "pending" }, "Hola"))
      .toEqual({ status: "pending", reason: "phone-unconfirmed" });
  });
  it("publishes every real catalog product with its landing and common contact", () => {
    const source = createVersionedContentSource();
    const app = createPresence(source, createWhatsAppDestination());
    const content = source.load();
    expect(app.productSlugs()).toHaveLength(content.products.length);
    for (const page of content.productLandings) {
      const view = app.productLanding(page.slug);
      expect(view?.product.id).toBe(page.productId);
      expect(view?.product.contact.message).toContain("quiero mi descuento de 20%");
      expect(view?.product.contact.destination.status).toBe("pending");
    }
  });

  it("activates every contact from a single company phone change", () => {
    const original = createVersionedContentSource().load();
    const app = createPresence({
      load: () => ({
        ...original, company: {
          ...original.company, phone: { status: "ready", international: "+44 7700 900123" },
        },
      }),
    }, createWhatsAppDestination());
    const home = app.home();
    const contacts = [
      home.company.contact, ...home.services.map((item) => item.contact),
      ...home.groups.flatMap((group) => group.products.map((item) => item.contact)),
      ...app.productSlugs().flatMap((slug) => {
        const page = app.productLanding(slug);
        return page ? [page.company.contact, page.product.contact] : [];
      }),
    ];
    for (const contact of contacts) {
      expect(contact.destination.status).toBe("ready");
      if (contact.destination.status !== "ready") throw new Error("Contacto sin activar");
      const url = new URL(contact.destination.href);
      expect(url.pathname).toBe("/447700900123");
      expect(url.searchParams.get("text")).toBe(contact.message);
    }
    expect(original.company.phone.status).toBe("pending");
  });
});
