export interface MarketingCopy {
  readonly finder: {
    readonly search: string;
    readonly clear: string;
    readonly close: string;
    readonly empty: string;
    readonly singular: string;
    readonly plural: string;
  };
  readonly navigation: {
    readonly products: string;
    readonly services: string;
    readonly visit: string;
  };
  readonly hero: { readonly browse: string };
  readonly services: { readonly heading: string };
  readonly catalog: { readonly heading: string };
  readonly footer: { readonly heading: string };
  readonly product: { readonly related: string };
  readonly ribbon: readonly string[];
}
