import {
  renderTopic,
  topicMetadata,
  topicParams,
} from "@/app/_discovery/topic-route";

export function generateStaticParams() {
  return topicParams("/trabajos/");
}
export async function generateMetadata({
  params,
}: PageProps<"/trabajos/[slug]">) {
  return topicMetadata("/trabajos/" + (await params).slug);
}
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  return renderTopic("/trabajos/" + (await params).slug);
}
