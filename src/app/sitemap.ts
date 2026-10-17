import type { MetadataRoute } from "next";
import { composeCommercialPresence } from "@/composition/commercial-presence/compose-commercial-presence";
import { getSiteConfig } from "@/composition/configuration/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const { origin, mode } = getSiteConfig();
  if (mode !== "public") return [];
  return composeCommercialPresence()
    .documents()
    .map((page) => ({ url: origin + page.seo.path }));
}
