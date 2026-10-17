import type { DiscoveryDocument, MediaView } from "../../contracts";
import type { SiteContent } from "../publication/content";
import { publishPrice } from "../pricing/publish-price";
import { selectProductIds } from "./select-products";
import type { PageSeoFactory } from "./page-seo";

export function createTopicDocuments(
  content: SiteContent,
  media: (id: string) => MediaView,
  seo: PageSeoFactory,
): readonly DiscoveryDocument[] {
  return content.discovery.topics.map((topic): DiscoveryDocument => {
    const service = content.services.find(
      (item) => item.id === topic.serviceId,
    );
    return {
      id: topic.id,
      kind: topic.kind,
      name: topic.name,
      heading: topic.heading,
      lead: topic.lead,
      media: media(topic.mediaId),
      price: publishPrice(),
      productIds: selectProductIds(content, topic.selection),
      seo: seo({
        id: topic.id,
        path: topic.path,
        name: topic.name,
        search: topic.search,
      }),
      breadcrumbs: [
        { name: "Inicio", href: "/" },
        { name: topic.name, href: topic.path },
      ],
      entity: service
        ? {
            kind: "Service",
            id: service.id,
            name: service.name,
            description: service.description,
          }
        : undefined,
    };
  });
}
