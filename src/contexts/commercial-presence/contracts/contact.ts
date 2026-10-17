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
