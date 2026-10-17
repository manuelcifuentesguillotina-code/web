import type { SiteContent } from "../content";

export interface ContentSource {
  load(): SiteContent;
}
