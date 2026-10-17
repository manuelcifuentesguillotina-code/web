import type { CatalogNavigationGroup } from "../../../../contracts";

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("es")
    .trim();
}

export function filterCatalog(
  groups: readonly CatalogNavigationGroup[],
  query: string,
): readonly CatalogNavigationGroup[] {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        words.every((word) => normalize(item.name).includes(word)),
      ),
    }))
    .filter((group) => group.items.length > 0);
}
