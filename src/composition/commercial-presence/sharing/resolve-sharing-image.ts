import "server-only";
import type { PageSeo } from "@/contexts/commercial-presence/contracts";
import { createSharingRevision } from "@/contexts/commercial-presence/infrastructure/sharing/create-sharing-revision";
import revisions from "@/contexts/commercial-presence/infrastructure/sharing/generated/artwork-revisions.json";
import { composeSharingContent } from "./compose-sharing-content";

export function resolveSharingImage(image: PageSeo["image"]): string {
  const content = composeSharingContent(image.key);
  if (!content) throw new Error("Contenido social inexistente: " + image.key);
  return image.path + "?v=" + createSharingRevision(content, revisions.assets);
}
