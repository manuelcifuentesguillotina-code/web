import { expect, it } from "vitest";
import { filterCatalog } from "./filter-catalog";
import type {
  CatalogNavigationGroup,
  CatalogNavigationItem,
} from "../../../../contracts";

function item(
  id: string,
  name: string,
  href: string,
  searchTerms: readonly string[] = [],
): CatalogNavigationItem {
  return {
    id,
    name,
    href,
    searchTerms,
    price: { status: "quote", label: "Precio por proyecto" },
    contact: {
      label: "Contactar",
      message: "Consulta " + name,
      pendingLabel: "Pendiente",
      benefit: { id: "offer", percent: 20, label: "20%", scope: "Proyecto" },
      destination: { status: "pending", reason: "phone-unconfirmed" },
    },
  };
}
const groups: readonly CatalogNavigationGroup[] = [
  {
    id: "a",
    name: "Papelería",
    items: [
      item("card", "Tarjetas corporativas", "/tarjetas", [
        "tarjetas de visita",
      ]),
    ],
  },
  {
    id: "b",
    name: "Comercial",
    items: [item("trifold", "Trípticos", "/tripticos")],
  },
];

it("finds unaccented and multiword names without changing catalog identity", () => {
  expect(filterCatalog(groups, " TRIPTICO ")[0]?.items[0]).toEqual(
    groups[1].items[0],
  );
  expect(filterCatalog(groups, "corporativa tarjeta")[0]?.items[0].id).toBe(
    "card",
  );
  expect(filterCatalog(groups, "")).toEqual(groups);
  expect(filterCatalog(groups, "ninguno")).toEqual([]);
  expect(groups[0].items).toHaveLength(1);
});

it("filters by category and catalog-owned aliases without rewriting product names", () => {
  expect(filterCatalog(groups, "visita")[0]?.items[0].name).toBe(
    "Tarjetas corporativas",
  );
  expect(
    filterCatalog(groups, "", "b").flatMap((group) =>
      group.items.map((item) => item.id),
    ),
  ).toEqual(["trifold"]);
  expect(filterCatalog(groups, "tarjetas", "b")).toEqual([]);
});
