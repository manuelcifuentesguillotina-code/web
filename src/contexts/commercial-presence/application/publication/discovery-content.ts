import type { PriceReference } from "../../contracts";

export interface SearchEditorial {
  readonly title: string;
  readonly description: string;
}

export interface TopicDefinition {
  readonly id: string;
  readonly kind: "service" | "collection" | "project" | "local";
  readonly path: string;
  readonly name: string;
  readonly heading: string;
  readonly lead: string;
  readonly mediaId: string;
  readonly selectionHeading: string;
  readonly selection:
    | { readonly categoryId: string }
    | { readonly serviceId: string }
    | { readonly productIds: readonly string[] };
  readonly serviceId?: string;
  readonly search: SearchEditorial;
}

export interface DiscoveryContent {
  readonly home: SearchEditorial;
  readonly products: readonly {
    readonly productId: string;
    readonly search: SearchEditorial;
  }[];
  readonly topics: readonly TopicDefinition[];
}

export type PriceDefinition =
  | { readonly productId: string; readonly status: "quote" }
  | {
      readonly productId: string;
      readonly status: "approved";
      readonly amount: number;
      readonly currency: "CLP";
      readonly basis: string;
      readonly tax: "included" | "excluded";
    }
  | {
      readonly productId: string;
      readonly status: "reference";
      readonly amount: number;
      readonly currency: "CLP";
      readonly basis: string;
      readonly tax: "included" | "excluded";
      readonly reference: PriceReference;
    };
