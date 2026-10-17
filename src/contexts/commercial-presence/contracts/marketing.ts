export interface MarketingCopy {
  readonly finder: {
    readonly all: string;
    readonly categories: string;
    readonly opening: string;
    readonly shortcuts: string;
    readonly search: string;
    readonly clear: string;
    readonly close: string;
    readonly empty: string;
    readonly singular: string;
    readonly plural: string;
  };
  readonly navigation: {
    readonly directions: string;
    readonly products: string;
    readonly services: string;
    readonly visit: string;
  };
  readonly hero: { readonly browse: string };
  readonly services: { readonly heading: string };
  readonly catalog: { readonly heading: string };
  readonly footer: { readonly heading: string };
  readonly product: {
    readonly related: string;
    readonly details?: {
      readonly uses: string;
      readonly preparation: string;
      readonly questions: string;
      readonly contact: string;
    };
  };
  readonly ribbon: readonly string[];
}
