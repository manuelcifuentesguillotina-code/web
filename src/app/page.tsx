import { PageStructuredData } from "./_discovery/page-structured-data";
import type { Metadata } from "next";
import { composeCommercialPresence } from "@/composition/commercial-presence/compose-commercial-presence";
import { HomeLanding } from "@/contexts/commercial-presence/presentation/landings/home/home-landing";
import { pageMetadata } from "./_discovery/page-metadata";

export function generateMetadata(): Metadata {
  return pageMetadata(composeCommercialPresence().home().seo);
}

export default function Home() {
  return (
    <>
      <PageStructuredData path="/" />
      <HomeLanding view={composeCommercialPresence().home()} />
    </>
  );
}
