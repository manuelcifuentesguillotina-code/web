import "server-only";
import type { SharingCardView } from "@/contexts/commercial-presence/contracts";
import { composeCommercialPresence } from "../compose-commercial-presence";
import { getSiteConfig } from "../../configuration/site-config";
import { loadSharingAssets } from "./load-sharing-assets";

export async function composeSharingCard(
  id: string,
): Promise<{ view: SharingCardView; font: Buffer } | undefined> {
  const app = composeCommercialPresence();
  const document = app.documents().find((page) => page.id === id);
  if (!document || document.media.status !== "ready") return undefined;
  const { font, artwork, palette } = await loadSharingAssets(
    document.media.src,
  );
  const home = app.home();
  return {
    font,
    view: {
      heading: document.kind === "product" ? document.name : document.heading,
      company: home.company.name,
      site: new URL(getSiteConfig().origin).hostname,
      artwork,
      palette,
      price: document.price,
      benefit: home.company.contact.benefit.label,
      scope: home.company.contact.benefit.scope,
    },
  };
}
