import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/composition/configuration/site-config";

export default function robots(): MetadataRoute.Robots {
  const { origin, mode } = getSiteConfig();
  return mode === "public"
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: origin + "/sitemap.xml",
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
