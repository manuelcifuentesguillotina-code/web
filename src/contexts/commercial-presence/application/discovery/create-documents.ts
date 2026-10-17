import type {
  CompanyView,
  DiscoveryDocument,
  MediaView,
  ProductView,
} from "../../contracts";
import type { SiteContent } from "../publication/content";
import { publishPrice } from "../pricing/publish-price";
import { createPageSeo } from "./page-seo";
import { createProductDocuments } from "./product-documents";
import { createTopicDocuments } from "./topic-documents";

export function createDocuments(
  content: SiteContent,
  company: CompanyView,
  products: readonly ProductView[],
  media: (id: string) => MediaView,
): readonly DiscoveryDocument[] {
  const seo = createPageSeo(company, company.contact.benefit);
  const documents: readonly DiscoveryDocument[] = [
    {
      id: "home",
      kind: "home",
      name: company.name,
      heading: content.home.heading,
      lead: content.home.intro,
      media: media(content.home.heroMediaId),
      price: publishPrice(),
      productIds: products.map((item) => item.id),
      seo: seo({
        id: "home",
        path: "/",
        name: company.name,
        search: content.discovery.home,
      }),
      breadcrumbs: [],
    },
    ...createProductDocuments(content, products, seo),
    ...createTopicDocuments(content, media, seo),
  ];
  if (
    new Set(documents.map((page) => page.seo.title)).size !== documents.length
  )
    throw new Error("Título de búsqueda duplicado");
  return documents;
}
