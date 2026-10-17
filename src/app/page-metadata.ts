import type { Metadata } from "next";
import type { PageSeo } from "@/contexts/commercial-presence/contracts";
import { getSiteConfig } from "@/composition/site-config";

export function pageMetadata(seo: PageSeo): Metadata {
  const config = getSiteConfig();
  const canonical = new URL(seo.path, config.origin).toString();
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical },
    robots: { index: config.mode === "public", follow: config.mode === "public" },
    openGraph: {
      title: seo.title, description: seo.description, url: canonical,
      type: "website", locale: "es_CL",
    },
  };
}
