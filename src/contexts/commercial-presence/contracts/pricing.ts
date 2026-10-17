export interface PriceReference {
  readonly provider: string;
  readonly href: string;
  readonly checkedOn: string;
  readonly scope: string;
}

interface PricedAmount {
  readonly amount: number;
  readonly currency: "CLP";
  readonly label: string;
  readonly basis: string;
  readonly tax: "included" | "excluded";
  readonly taxLabel: string;
}

export type PublishedPrice =
  | { readonly status: "quote"; readonly label: string }
  | (PricedAmount & { readonly status: "approved" })
  | (PricedAmount & {
      readonly status: "reference";
      readonly reference: PriceReference;
    });
