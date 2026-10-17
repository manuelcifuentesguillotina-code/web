import type { PublishedPrice } from "./pricing";
import type { MediaView } from "./media";

export interface SharingCardContent {
  readonly heading: string;
  readonly company: string;
  readonly site: string;
  readonly media: MediaView;
  readonly price: PublishedPrice;
  readonly benefit: string;
  readonly scope: string;
}

export interface SharingCardView extends Omit<SharingCardContent, "media"> {
  readonly artwork: string;
  readonly palette: {
    readonly ink: string;
    readonly paper: string;
    readonly accent: string;
    readonly warm: string;
  };
}
