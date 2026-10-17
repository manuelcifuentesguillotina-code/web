import type { MediaView } from "./media";
import type { PublishedPrice } from "./pricing";

export interface DiscoveryLink {
  readonly name: string;
  readonly href: string;
}

export interface DiscoveryNavigationLink extends DiscoveryLink {
  readonly kind: DiscoveryDocument["kind"];
}

export interface PageSeo {
  readonly siteName: string;
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly social: {
    readonly title: string;
    readonly description: string;
  };
  readonly image: {
    readonly key: string;
    readonly path: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
  };
}

export interface DiscoveryDocument {
  readonly id: string;
  readonly kind:
    | "home"
    | "product"
    | "service"
    | "collection"
    | "project"
    | "local";
  readonly name: string;
  readonly heading: string;
  readonly lead: string;
  readonly media: MediaView;
  readonly seo: PageSeo;
  readonly breadcrumbs: readonly DiscoveryLink[];
  readonly productIds: readonly string[];
  readonly price: PublishedPrice;
  readonly entity?: {
    readonly kind: "Product" | "Service";
    readonly id: string;
    readonly name: string;
    readonly description: string;
  };
}

export type StructuredValue =
  | string
  | number
  | boolean
  | null
  | StructuredObject
  | readonly StructuredValue[];
export interface StructuredObject {
  readonly [key: string]: StructuredValue | undefined;
}
