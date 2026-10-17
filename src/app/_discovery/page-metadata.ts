import type { Metadata } from "next";
import type { PageSeo } from "@/contexts/commercial-presence/contracts";
import { getSiteConfig } from "@/composition/configuration/site-config";

export function pageMetadata(seo: PageSeo): Metadata {
  const config = getSiteConfig();
  const canonical = new URL(seo.path, config.origin).toString();
  const image = {
    url: new URL(seo.image.path, config.origin).toString(),
    width: seo.image.width,
    height: seo.image.height,
    alt: seo.image.alt,
    type: "image/png",
  };
  return {
    title: seo.title,
    description: seo.description,
    applicationName: seo.siteName,
    alternates: { canonical },
    robots: {
      index: config.mode === "public",
      follow: config.mode === "public",
      googleBot: {
        index: config.mode === "public",
        follow: config.mode === "public",
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: seo.siteName,
      type: "website",
      locale: "es_CL",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [{ url: image.url, alt: image.alt }],
    },
    icons: { icon: "/icon.svg", apple: "/apple-icon" },
    category: "business",
  };
}
