import type { SiteContent } from "../publication/content";

export interface ContentSource {
  load(): SiteContent;
}
