import type { PublishedPrice } from "./pricing";

export interface SharingCardView {
  readonly heading: string;
  readonly company: string;
  readonly site: string;
  readonly artwork: string;
  readonly price: PublishedPrice;
  readonly benefit: string;
  readonly scope: string;
  readonly palette: {
    readonly ink: string;
    readonly paper: string;
    readonly accent: string;
    readonly warm: string;
  };
}
