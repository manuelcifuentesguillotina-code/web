import type { Metadata } from "next";
import { composeCommercialPresence } from "@/composition/commercial-presence";
import { HomeLanding } from "@/contexts/commercial-presence/presentation/home-landing";
import { pageMetadata } from "./page-metadata";

export function generateMetadata(): Metadata {
  return pageMetadata(composeCommercialPresence().home().seo);
}

export default function Home() {
  return <HomeLanding view={composeCommercialPresence().home()} />;
}
