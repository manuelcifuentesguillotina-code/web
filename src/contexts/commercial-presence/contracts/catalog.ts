import type { ContactAction } from "./contact";
import type { MediaView } from "./media";
import type { PublishedPrice } from "./pricing";

export interface CatalogNavigationGroup {
  readonly id: string;
  readonly name: string;
  readonly items: readonly {
    readonly id: string;
    readonly name: string;
    readonly href: string;
  }[];
}

export interface ProductView {
  readonly price: PublishedPrice;
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
  readonly href: string;
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly media: MediaView;
  readonly contact: ContactAction;
}
