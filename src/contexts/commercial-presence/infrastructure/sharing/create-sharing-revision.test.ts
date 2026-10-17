import { describe, expect, it } from "vitest";
import type { SharingCardContent } from "../../contracts";
import { createSharingRevision } from "./create-sharing-revision";

const assets = {
  "/artwork/cards.svg": "a".repeat(64),
  "/artwork/folders.svg": "b".repeat(64),
};
const card: SharingCardContent = {
  heading: "Tarjetas",
  company: "Imprenta de prueba",
  site: "example.test",
  media: {
    id: "cards",
    status: "ready",
    label: "Tarjetas",
    src: "/artwork/cards.svg",
    width: 1200,
    height: 900,
  },
  price: { status: "quote", label: "Precio por proyecto" },
  benefit: "20% de descuento",
  scope: "Total del proyecto.",
};

describe("sharing content revision", () => {
  it("changes when rendered facts or the relevant SVG change, without invalidating unrelated campaigns", () => {
    const original = createSharingRevision(card, assets);
    expect(original).toMatch(/^[a-f0-9]{20}$/);
    for (const change of [
      { ...card, heading: "Tarjetas impresas" },
      { ...card, benefit: "25% de descuento" },
      {
        ...card,
        price: {
          status: "approved" as const,
          label: "$100.000",
          amount: 100000,
          currency: "CLP" as const,
          basis: "500 tarjetas",
          taxLabel: "IVA incluido",
          tax: "included" as const,
        },
      },
    ])
      expect(createSharingRevision(change, assets)).not.toBe(original);
    expect(
      createSharingRevision(card, {
        ...assets,
        "/artwork/cards.svg": "c".repeat(64),
      }),
    ).not.toBe(original);
    expect(
      createSharingRevision(card, {
        ...assets,
        "/artwork/folders.svg": "c".repeat(64),
      }),
    ).toBe(original);
    expect(
      createSharingRevision(JSON.parse(JSON.stringify(card)), assets),
    ).toBe(original);
  });

  it("fails publication rather than emitting an untracked or unresolved image", () => {
    expect(() => createSharingRevision(card, {})).toThrow(
      "Revisión de recurso",
    );
    expect(() =>
      createSharingRevision(
        {
          ...card,
          media: { id: "pending", status: "placeholder", label: "Pendiente" },
        },
        assets,
      ),
    ).toThrow("recurso aprobado");
  });
});
