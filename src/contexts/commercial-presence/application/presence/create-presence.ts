import type {
  DiscoveryDocument,
  HomeView,
  ProductLandingView,
  TopicLandingView,
  StructuredObject,
} from "../../contracts";
import type { ContentSource } from "../ports/content-source";
import type { ContactDestinationResolver } from "../ports/contact-destination";
import type { LocationDestinationResolver } from "../ports/location-destination";
import { validateContent } from "../publication/validate-content";
import { createViewBuilders } from "./build-views";
import { createDocuments } from "../discovery/create-documents";
import { buildStructuredData } from "../discovery/structured-data";

export interface PresenceApplication {
  structuredData(
    path: string,
    origin: string,
    imagePath?: string,
  ): StructuredObject | undefined;
  documents(): readonly DiscoveryDocument[];
  document(path: string): DiscoveryDocument | undefined;
  topicLanding(path: string): TopicLandingView | undefined;
  home(): HomeView;
  productLanding(slug: string): ProductLandingView | undefined;
  productSlugs(): readonly string[];
}

export function createPresence(
  source: ContentSource,
  destination: ContactDestinationResolver,
  location: LocationDestinationResolver,
): PresenceApplication {
  const content = source.load();
  validateContent(content);
  const views = createViewBuilders(content, destination, location);
  const company = views.companyView();
  const products = content.products.map(views.product);
  const documents = createDocuments(content, company, products, views.media);
  const discovery = documents
    .filter((item) => !["home", "product"].includes(item.kind))
    .map((item) => ({ name: item.name, href: item.seo.path, kind: item.kind }));
  function findDocument(path: string): DiscoveryDocument | undefined {
    return documents.find((item) => item.seo.path === path);
  }
  const groups = content.home.categoryOrder.map((id) => {
    const category = content.categories.find((item) => item.id === id);
    if (!category) throw new Error("Categoría editorial no resuelta: " + id);
    const ids = new Set(
      content.products
        .filter((item) => item.categoryId === id)
        .map((item) => item.id),
    );
    return {
      id,
      name: category.name,
      products: products.filter((item) => ids.has(item.id)),
    };
  });
  const navigation = groups.map((group) => ({
    id: group.id,
    name: group.name,
    items: group.products.map(
      ({ id, name, href, price, contact, searchTerms }) => ({
        id,
        name,
        href,
        price,
        contact,
        searchTerms,
      }),
    ),
  }));

  return {
    structuredData(path, origin, imagePath) {
      const page = findDocument(path);
      return page
        ? buildStructuredData(content, documents, page, origin, imagePath)
        : undefined;
    },
    documents: () => documents,
    document: findDocument,
    topicLanding(path): TopicLandingView | undefined {
      const page = findDocument(path);
      const definition = content.discovery.topics.find(
        (item) => item.path === path,
      );
      if (!page || !definition) return undefined;
      return {
        company,
        navigation,
        discovery,
        copy: content.copy,
        document: page,
        contact: views.contact(page.entity?.name ?? page.name),
        products: page.productIds.map((id) => {
          const product = products.find((item) => item.id === id);
          if (!product) throw new Error("Selección no resuelta: " + id);
          return product;
        }),
        selectionHeading: definition.selectionHeading,
      };
    },
    home(): HomeView {
      const page = findDocument("/");
      if (!page) throw new Error("Portada no publicada");
      return {
        discovery,
        company,
        navigation,
        heading: content.home.heading,
        intro: content.home.intro,
        copy: content.copy,
        heroMedia: views.media(content.home.heroMediaId),
        services: views.serviceViews(),
        groups,
        seo: page.seo,
      };
    },
    productLanding(slug): ProductLandingView | undefined {
      const page = content.productLandings.find((item) => item.slug === slug);
      const product =
        page && products.find((item) => item.id === page.productId);
      if (!page || !product) return undefined;
      const documentView = findDocument(product.href);
      if (!documentView) return undefined;
      const categoryId = content.products.find(
        (item) => item.id === product.id,
      )?.categoryId;
      const relatedIds = new Set(
        content.products
          .filter((item) => item.categoryId === categoryId)
          .map((item) => item.id),
      );
      return {
        discovery,
        breadcrumbs: documentView.breadcrumbs,
        editorial: page.editorial,
        company,
        product,
        navigation,
        copy: content.copy,
        related: products.filter(
          (item) => relatedIds.has(item.id) && item.id !== product.id,
        ),
        seo: documentView.seo,
      };
    },
    productSlugs(): readonly string[] {
      return content.productLandings.map((item) => item.slug);
    },
  };
}
