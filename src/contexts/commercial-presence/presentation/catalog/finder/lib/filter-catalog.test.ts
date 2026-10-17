import { expect, it } from "vitest";
import { filterCatalog } from "./filter-catalog";
import type { CatalogNavigationGroup } from "../../../../contracts";

const groups: readonly CatalogNavigationGroup[] = [
  {
    id: "a",
    name: "Papelería",
    items: [{ id: "card", name: "Tarjetas corporativas", href: "/tarjetas" }],
  },
  {
    id: "b",
    name: "Comercial",
    items: [{ id: "trifold", name: "Trípticos", href: "/tripticos" }],
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
