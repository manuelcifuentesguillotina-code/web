import "server-only";
import { createPresence, type PresenceApplication } from "@/contexts/commercial-presence/application/create-presence";
import { createVersionedContentSource } from "@/contexts/commercial-presence/infrastructure/versioned-content-source";
import { createWhatsAppDestination } from "@/contexts/commercial-presence/infrastructure/whatsapp-destination";
import { getSiteConfig } from "./site-config";
import { assertReleaseReady } from "./publication-config";

export function composeCommercialPresence(): PresenceApplication {
  const source = createVersionedContentSource();
  const config = getSiteConfig();
  assertReleaseReady(config, source.load().company.phone.status === "ready");
  return createPresence(source, createWhatsAppDestination());
}
