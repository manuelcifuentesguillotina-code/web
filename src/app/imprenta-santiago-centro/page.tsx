import { renderTopic, topicMetadata } from "@/app/_discovery/topic-route";

const path = "/imprenta-santiago-centro";
export function generateMetadata() {
  return topicMetadata(path);
}
export default function Page() {
  return renderTopic(path);
}
