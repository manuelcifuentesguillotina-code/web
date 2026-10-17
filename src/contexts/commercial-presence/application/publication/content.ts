import type { MediaView } from "../../contracts";

export interface TypicalQuantity {
  readonly amount: number;
  readonly unit: string;
  readonly composition?: string;
}

export interface CatalogProduct {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly categoryId: string;
  readonly mediaId: string;
  readonly typicalQuantity?: TypicalQuantity;
}

export interface CatalogService {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly mediaId: string;
}

export interface ProductCategory {
  readonly id: string;
  readonly name: string;
  readonly serviceId: string;
}

export interface CompanyContent {
  readonly name: string;
  readonly logoMediaId: string;
  readonly serviceArea: string;
  readonly address: { readonly street: string; readonly number: string; readonly locality: string };
  readonly hours: { readonly days: string; readonly opens: string; readonly closes: string };
  readonly productionDays: number;
  readonly phone:
    | { readonly status: "pending" }
    | { readonly status: "ready"; readonly international: string };
}

export interface CommercialOffer {
  readonly id: string;
  readonly percent: number;
  readonly scope: string;
}

export interface ContactTemplates {
  readonly request: string;
  readonly product: string;
  readonly action: string;
  readonly benefit: string;
  readonly pending: string;
  readonly visit: string;
  readonly production: string;
}

export interface SiteContent {
  readonly company: CompanyContent;
  readonly services: readonly CatalogService[];
  readonly categories: readonly ProductCategory[];
  readonly products: readonly CatalogProduct[];
  readonly productLandings: readonly { readonly productId: string; readonly slug: string }[];
  readonly offer: CommercialOffer;
  readonly messages: ContactTemplates;
  readonly media: readonly MediaView[];
  readonly home: {
    readonly heading: string;
    readonly intro: string;
    readonly categoryOrder: readonly string[];
  };
}
