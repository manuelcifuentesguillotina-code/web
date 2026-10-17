import type { DiscoveryDocument, ProductView } from "../../contracts";
import type { SiteContent } from "../publication/content";
import type { PageSeoFactory } from "./page-seo";

export function createProductDocuments(
  content: SiteContent,
  products: readonly ProductView[],
  seo: PageSeoFactory,
): readonly DiscoveryDocument[] {
  return products.map((product): DiscoveryDocument => {
    const landing = content.productLandings.find(
      (item) => item.productId === product.id,
    );
    if (!landing) throw new Error("Producto sin landing: " + product.id);
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
      seo: seo({
        id: product.id,
        path: product.href,
        name: product.name,
        search: landing.search,
        social: landing.social,
      }),
      breadcrumbs: [
        { name: "Inicio", href: "/" },
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
}
