export interface Benefit {
  readonly id: string;
  readonly percent: number;
  readonly label: string;
  readonly scope: string;
}

export type ContactDestination =
  | { readonly status: "ready"; readonly href: string }
  | { readonly status: "pending"; readonly reason: string };

export interface ContactAction {
  readonly message: string;
  readonly label: string;
  readonly pendingLabel: string;
  readonly benefit: Benefit;
  readonly destination: ContactDestination;
}

export type MediaView =
  | { readonly id: string; readonly status: "placeholder"; readonly label: string }
  | {
    readonly id: string;
    readonly status: "ready";
    readonly label: string;
    readonly src: string;
    readonly width: number;
    readonly height: number;
  };

export interface ProductView {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly href: string;
  readonly category: string;
  readonly quantity?: string;
  readonly media: MediaView;
  readonly contact: ContactAction;
}

export interface ServiceView {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly media: MediaView;
  readonly contact: ContactAction;
}

export interface CompanyView {
  readonly name: string;
  readonly logo: MediaView;
  readonly serviceArea: string;
  readonly address: string;
  readonly visit: string;
  readonly hours: string;
  readonly production: string;
  readonly contact: ContactAction;
}

export interface PageSeo {
  readonly title: string;
  readonly description: string;
  readonly path: string;
}

export interface HomeView {
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
  readonly company: CompanyView;
  readonly product: ProductView;
  readonly related: readonly ProductView[];
  readonly seo: PageSeo;
}
