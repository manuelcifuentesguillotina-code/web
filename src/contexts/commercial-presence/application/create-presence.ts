import type { HomeView, ProductLandingView } from "../contracts";
import type { ContentSource } from "./ports/content-source";
import type { ContactDestinationResolver } from "./ports/contact-destination";
import { validateContent } from "./validate-content";
import { createViewBuilders } from "./build-views";

export interface PresenceApplication {
  home(): HomeView;
  productLanding(slug: string): ProductLandingView | undefined;
  productSlugs(): readonly string[];
}

export function createPresence(
  source: ContentSource,
  destination: ContactDestinationResolver,
): PresenceApplication {
  const content = source.load();
  validateContent(content);
  const views = createViewBuilders(content, destination);
  const company = views.companyView();
  const products = content.products.map(views.product);

  return {
    home(): HomeView {
      return {
        company, heading: content.home.heading, intro: content.home.intro,
        services: views.serviceViews(),
        groups: content.home.categoryOrder.map((id) => {
          const category = content.categories.find((item) => item.id === id);
          if (!category) throw new Error("Categoría editorial no resuelta: " + id);
          const ids = new Set(content.products.filter((item) => item.categoryId === id).map((item) => item.id));
          return { id, name: category.name, products: products.filter((item) => ids.has(item.id)) };
        }),
        seo: { title: company.name, description: content.home.intro, path: "/" },
      };
    },
    productLanding(slug): ProductLandingView | undefined {
      const page = content.productLandings.find((item) => item.slug === slug);
      const product = page && products.find((item) => item.id === page.productId);
      if (!product) return undefined;
      const categoryId = content.products.find((item) => item.id === product.id)?.categoryId;
      const relatedIds = new Set(content.products.filter((item) => item.categoryId === categoryId).map((item) => item.id));
      return {
        company, product,
        related: products.filter((item) => relatedIds.has(item.id) && item.id !== product.id),
        seo: { title: product.name + " | " + company.name, description: product.description, path: product.href },
      };
    },
    productSlugs(): readonly string[] {
      return content.productLandings.map((item) => item.slug);
    },
  };
}
