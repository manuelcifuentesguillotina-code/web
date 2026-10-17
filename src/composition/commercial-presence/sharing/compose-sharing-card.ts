import "server-only";
import type { SharingCardView } from "@/contexts/commercial-presence/contracts";
import { composeSharingContent } from "./compose-sharing-content";
import { loadSharingAssets } from "./load-sharing-assets";

export async function composeSharingCard(
  id: string,
): Promise<{ view: SharingCardView; font: Buffer } | undefined> {
  const content = composeSharingContent(id);
  if (!content || content.media.status !== "ready") return undefined;
  const { media, ...resolved } = content;
  const { font, artwork, palette } = await loadSharingAssets(media.src);
  return {
    font,
    view: {
      ...resolved,
      artwork,
      palette,
    },
  };
}
