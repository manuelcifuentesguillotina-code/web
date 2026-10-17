import "server-only";
import { readSiteConfig, type SiteConfig } from "./publication-config";

export function getSiteConfig(): SiteConfig {
  return readSiteConfig(process.env);
}
