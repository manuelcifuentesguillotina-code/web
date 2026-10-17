"use client";

import { useState } from "react";
import type { CatalogNavigationGroup } from "../../../../contracts";
import { filterCatalog } from "../lib/filter-catalog";

export function useProductSearch(groups: readonly CatalogNavigationGroup[]) {
  const [query, setQuery] = useState("");
  const [groupId, setGroupId] = useState<string>();
  const results = filterCatalog(groups, query, groupId);
  const count = results.reduce((sum, group) => sum + group.items.length, 0);
  return {
    query,
    setQuery,
    groupId,
    setGroupId,
    results,
    count,
    clear: () => setQuery(""),
  };
}
