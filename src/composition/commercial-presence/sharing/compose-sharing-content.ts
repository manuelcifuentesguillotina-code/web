import "server-only";
import type { SharingCardContent } from "@/contexts/commercial-presence/contracts";
import { createSharingContent } from "@/contexts/commercial-presence/application/sharing/create-sharing-content";
import { composeCommercialPresence } from "../compose-commercial-presence";
import { getSiteConfig } from "../../configuration/site-config";

export function composeSharingContent(
  id: string,
): SharingCardContent | undefined {
  const app = composeCommercialPresence();
  const document = app.documents().find((page) => page.id === id);
  return document
    ? createSharingContent(
        document,
        app.home().company,
        new URL(getSiteConfig().origin).hostname,
      )
    : undefined;
}
