import { describe, expect, it } from "vitest";
import { createPresence } from "../../application/presence/create-presence";
import { contentFixture } from "../../application/publication/content.fixture";
import { createGoogleMapsDestination } from "./google-maps-destination";

describe("location destination", () => {
  it("encodes the confirmed destination without assuming origin or travel mode", () => {
    const address = "Calle & Ramírez 99, Santiago Centro";
    const href = createGoogleMapsDestination().resolve(address, "CL");
    const url = new URL(href);
    expect(url.origin + url.pathname).toBe("https://www.google.com/maps/dir/");
    expect([...url.searchParams.entries()]).toEqual([
      ["api", "1"],
      ["destination", address + ", CL"],
    ]);
  });

  it("derives every landing destination from the company address", () => {
    const original = contentFixture();
    const content = {
      ...original,
      company: {
        ...original.company,
        address: { ...original.company.address, number: "99" },
      },
    };
    const app = createPresence(
      { load: () => content },
      { resolve: () => ({ status: "pending", reason: "phone-unconfirmed" }) },
      createGoogleMapsDestination(),
    );
    const destination = app.home().company.directions;
    expect(new URL(destination.href).searchParams.get("destination")).toContain(
      "99",
    );
    expect(app.productLanding("tarjetas")?.company.directions).toEqual(
      destination,
    );
  });
});
