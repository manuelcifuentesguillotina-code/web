export type PublishedPrice =
  | { readonly status: "quote"; readonly label: string }
  | {
      readonly status: "approved";
      readonly amount: number;
      readonly currency: "CLP";
      readonly label: string;
      readonly basis: string;
      readonly tax: "included" | "excluded";
      readonly taxLabel: string;
    };
