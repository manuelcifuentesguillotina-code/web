import { notFound } from "next/navigation";
import { composeCommercialPresence } from "@/composition/commercial-presence/compose-commercial-presence";
import { TopicLanding } from "@/contexts/commercial-presence/presentation/landings/topic/topic-landing";
import { pageMetadata } from "./page-metadata";
import { PageStructuredData } from "./page-structured-data";

export function topicParams(prefix: string) {
  return composeCommercialPresence()
    .documents()
    .filter((page) => page.seo.path.startsWith(prefix))
    .map((page) => ({ slug: page.seo.path.slice(prefix.length) }));
}

export function topicMetadata(path: string) {
  const document = composeCommercialPresence().document(path);
  if (!document)
    return {
      title: "Página no encontrada",
      robots: { index: false, follow: false },
    };
  return pageMetadata(document.seo);
}

export function renderTopic(path: string) {
  const view = composeCommercialPresence().topicLanding(path);
  if (!view) notFound();
  return (
    <>
      <PageStructuredData path={path} />
      <TopicLanding view={view} />
    </>
  );
}
