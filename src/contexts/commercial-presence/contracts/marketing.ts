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
  readonly hero: {
    readonly eyebrow: string;
    readonly browse: string;
    readonly artCaption: string;
  };
  readonly services: { readonly eyebrow: string; readonly heading: string };
  readonly catalog: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly detail: string;
  };
  readonly process: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly steps: readonly {
      readonly id: string;
      readonly title: string;
      readonly detail: string;
    }[];
  };
  readonly footer: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly channel: string;
  };
  readonly product: {
    readonly back: string;
    readonly quantity: string;
    readonly related: string;
  };
  readonly ribbon: readonly string[];
}
