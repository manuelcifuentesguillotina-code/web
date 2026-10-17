import {
  renderTopic,
  topicMetadata,
  topicParams,
} from "@/app/_discovery/topic-route";

export function generateStaticParams() {
  return topicParams("/proyectos/");
}
export async function generateMetadata({
  params,
}: PageProps<"/proyectos/[slug]">) {
  return topicMetadata("/proyectos/" + (await params).slug);
}
export default async function Page({ params }: PageProps<"/proyectos/[slug]">) {
  return renderTopic("/proyectos/" + (await params).slug);
}
