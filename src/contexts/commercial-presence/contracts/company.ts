import type { ContactAction } from "./contact";
import type { MediaView } from "./media";
import type { DiscoveryLink } from "./discovery";

export interface CompanyView {
  readonly directions: DiscoveryLink;
  readonly name: string;
  readonly logo: MediaView;
  readonly serviceArea: string;
  readonly address: string;
  readonly visit: string;
  readonly hours: string;
  readonly production: string;
  readonly contact: ContactAction;
}
