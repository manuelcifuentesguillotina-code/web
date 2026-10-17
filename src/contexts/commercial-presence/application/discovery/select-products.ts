import type { SiteContent } from "../publication/content";
import type { TopicDefinition } from "../publication/discovery-content";

export function selectProductIds(
  content: SiteContent,
  selection: TopicDefinition["selection"],
): readonly string[] {
  if ("productIds" in selection) return selection.productIds;
  const categories =
    "categoryId" in selection
      ? [selection.categoryId]
      : content.categories
          .filter((item) => item.serviceId === selection.serviceId)
          .map((item) => item.id);
  return content.products
    .filter((item) => categories.includes(item.categoryId))
    .map((item) => item.id);
}
