import type { DiscoveryDocument, StructuredObject } from "../../contracts";
import type { SiteContent } from "../publication/content";
import { businessEntity } from "./structured-entities";

export function buildStructuredData(
  content: SiteContent,
  documents: readonly DiscoveryDocument[],
  page: DiscoveryDocument,
  origin: string,
): StructuredObject {
  const canonical = origin + page.seo.path;
  const businessId = origin + "/#business";
  const websiteId = origin + "/#website";
  const entityId = canonical + "#item";
  const image = origin + page.seo.image.path;
  const graph: StructuredObject[] = [
    businessEntity(content.company, origin),
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: origin + "/",
      name: content.company.name,
      inLanguage: "es-CL",
      publisher: { "@id": businessId },
    },
    {
      "@type": ["collection", "project"].includes(page.kind)
        ? "CollectionPage"
        : "WebPage",
      "@id": canonical + "#webpage",
      url: canonical,
      name: page.seo.title,
      description: page.seo.description,
      inLanguage: "es-CL",
      isPartOf: { "@id": websiteId },
      about: { "@id": page.entity ? entityId : businessId },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: image,
        width: page.seo.image.width,
        height: page.seo.image.height,
      },
      ...(page.breadcrumbs.length
        ? { breadcrumb: { "@id": canonical + "#breadcrumbs" } }
        : {}),
    },
  ];
  if (page.breadcrumbs.length)
    graph.push({
      "@type": "BreadcrumbList",
      "@id": canonical + "#breadcrumbs",
      itemListElement: page.breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: origin + item.href,
      })),
    });
  if (page.entity) {
    const price = page.price;
    graph.push({
      "@type": page.entity.kind,
      "@id": entityId,
      name: page.entity.name,
      description: page.entity.description,
      url: canonical,
      image,
      ...(page.entity.kind === "Service"
        ? { provider: { "@id": businessId }, areaServed: "CL" }
        : { manufacturer: { "@id": businessId } }),
      ...(price.status === "approved"
        ? {
            offers: {
              "@type": "Offer",
              url: canonical,
              price: price.amount,
              priceCurrency: price.currency,
              description: price.basis,
              seller: { "@id": businessId },
              priceSpecification: {
                "@type": "PriceSpecification",
                price: price.amount,
                priceCurrency: price.currency,
                valueAddedTaxIncluded: price.tax === "included",
              },
            },
          }
        : {}),
    });
  }
  if (page.kind !== "product" && page.productIds.length)
    graph.push({
      "@type": "ItemList",
      "@id": canonical + "#products",
      name: page.name,
      numberOfItems: page.productIds.length,
      itemListElement: page.productIds.map((id, index) => {
        const product = documents.find(
          (item) => item.kind === "product" && item.id === id,
        );
        if (!product)
          throw new Error("Producto estructurado sin documento: " + id);
        return {
          "@type": "ListItem",
          position: index + 1,
          name: product.name,
          url: origin + product.seo.path,
        };
      }),
    });
  return { "@context": "https://schema.org", "@graph": graph };
}
