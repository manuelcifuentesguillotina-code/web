import {
  renderTopic,
  topicMetadata,
  topicParams,
} from "@/app/_discovery/topic-route";

export function generateStaticParams() {
  return topicParams("/servicios/");
}
export async function generateMetadata({
  params,
}: PageProps<"/servicios/[slug]">) {
  return topicMetadata("/servicios/" + (await params).slug);
}
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  return renderTopic("/servicios/" + (await params).slug);
}
