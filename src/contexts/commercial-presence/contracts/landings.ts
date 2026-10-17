import type { CompanyView } from "./company";
import type {
  CatalogNavigationGroup,
  ProductView,
  ServiceView,
} from "./catalog";
import type { MediaView } from "./media";
import type { MarketingCopy } from "./marketing";

export interface PageSeo {
  readonly title: string;
  readonly description: string;
  readonly path: string;
}

export interface HomeView {
  readonly navigation: readonly CatalogNavigationGroup[];
  readonly copy: MarketingCopy;
  readonly heroMedia: MediaView;
  readonly company: CompanyView;
  readonly heading: string;
  readonly intro: string;
  readonly services: readonly ServiceView[];
  readonly groups: readonly {
    readonly id: string;
    readonly name: string;
    readonly products: readonly ProductView[];
  }[];
  readonly seo: PageSeo;
}

export interface ProductLandingView {
  readonly navigation: readonly CatalogNavigationGroup[];
  readonly copy: MarketingCopy;
  readonly company: CompanyView;
  readonly product: ProductView;
  readonly related: readonly ProductView[];
  readonly seo: PageSeo;
}
