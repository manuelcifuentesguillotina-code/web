import type { CompanyView } from "./company";
import type {
  CatalogNavigationGroup,
  ProductView,
  ServiceView,
} from "./catalog";
import type { MediaView } from "./media";
import type { MarketingCopy } from "./marketing";
import type {
  PageSeo,
  DiscoveryLink,
  DiscoveryDocument,
  DiscoveryNavigationLink,
} from "./discovery";
import type { ContactAction } from "./contact";

export interface HomeView {
  readonly discovery: readonly DiscoveryNavigationLink[];
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

export interface ProductLandingEditorial {
  readonly intro: string;
  readonly uses: readonly string[];
  readonly preparation: readonly string[];
  readonly faqs: readonly {
    readonly question: string;
    readonly answer: string;
  }[];
}

export interface ProductLandingView {
  readonly editorial?: ProductLandingEditorial;
  readonly discovery: readonly DiscoveryNavigationLink[];
  readonly breadcrumbs: readonly DiscoveryLink[];
  readonly navigation: readonly CatalogNavigationGroup[];
  readonly copy: MarketingCopy;
  readonly company: CompanyView;
  readonly product: ProductView;
  readonly related: readonly ProductView[];
  readonly seo: PageSeo;
}

export interface TopicLandingView {
  readonly company: CompanyView;
  readonly navigation: readonly CatalogNavigationGroup[];
  readonly discovery: readonly DiscoveryNavigationLink[];
  readonly copy: MarketingCopy;
  readonly document: DiscoveryDocument;
  readonly contact: ContactAction;
  readonly products: readonly ProductView[];
  readonly selectionHeading: string;
}
