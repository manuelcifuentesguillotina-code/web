import type {
  CompanyView,
  DiscoveryDocument,
  MediaView,
  ProductView,
} from "../../contracts";
import { interpolate } from "../../domain/contact/commercial-message";
import type { SiteContent } from "../publication/content";
import type { SearchEditorial } from "../publication/discovery-content";
import { publishPrice } from "../pricing/publish-price";
import { selectProductIds } from "./select-products";

export function createDocuments(
  content: SiteContent,
  company: CompanyView,
  products: readonly ProductView[],
  media: (id: string) => MediaView,
): readonly DiscoveryDocument[] {
  function seo(
    id: string,
    path: string,
    name: string,
    editorial: SearchEditorial,
  ) {
    const values = {
      company: company.name,
      address: company.address,
      product: name,
    };
    return {
      siteName: company.name,
      path,
      title: interpolate(editorial.title, values),
      description: interpolate(editorial.description, values),
      image: {
        path: "/compartir/" + id,
        alt: name + " | " + company.name,
        width: 1200,
        height: 630,
      },
    };
  }
  const home = { name: "Inicio", href: "/" };
  const productDocuments = products.map((product): DiscoveryDocument => {
    const editorial = content.discovery.products.find(
      (item) => item.productId === product.id,
    );
    if (!editorial)
      throw new Error("Producto sin intención de búsqueda: " + product.id);
    const categoryId = content.products.find(
      (item) => item.id === product.id,
    )?.categoryId;
    const collection = content.discovery.topics.find(
      (item) =>
        "categoryId" in item.selection &&
        item.selection.categoryId === categoryId,
    );
    return {
      id: product.id,
      kind: "product",
      name: product.name,
      heading: product.name,
      lead: product.description,
      media: product.media,
      price: product.price,
      productIds: [product.id],
      seo: seo(product.id, product.href, product.name, editorial.search),
      breadcrumbs: [
        home,
        ...(collection
          ? [{ name: collection.name, href: collection.path }]
          : []),
        { name: product.name, href: product.href },
      ],
      entity: {
        kind: "Product",
        id: product.id,
        name: product.name,
        description: product.description,
      },
    };
  });
  const topics = content.discovery.topics.map((topic): DiscoveryDocument => {
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
      seo: seo(topic.id, topic.path, topic.name, topic.search),
      breadcrumbs: [home, { name: topic.name, href: topic.path }],
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
      seo: seo("home", "/", company.name, content.discovery.home),
      breadcrumbs: [],
    },
    ...productDocuments,
    ...topics,
  ];
  if (
    new Set(documents.map((page) => page.seo.title)).size !== documents.length
  )
    throw new Error("Título de búsqueda duplicado");
  return documents;
}
