import "server-only";
import {
  createPresence,
  type PresenceApplication,
} from "@/contexts/commercial-presence/application/presence/create-presence";
import { createVersionedContentSource } from "@/contexts/commercial-presence/infrastructure/content/versioned-content-source";
import { createWhatsAppDestination } from "@/contexts/commercial-presence/infrastructure/contact/whatsapp-destination";
import { createGoogleMapsDestination } from "@/contexts/commercial-presence/infrastructure/location/google-maps-destination";
import { getSiteConfig } from "../configuration/site-config";
import { assertReleaseReady } from "../configuration/publication-config";

export function composeCommercialPresence(): PresenceApplication {
  const source = createVersionedContentSource();
  const config = getSiteConfig();
  assertReleaseReady(config, source.load().company.phone.status === "ready");
  return createPresence(
    source,
    createWhatsAppDestination(),
    createGoogleMapsDestination(),
  );
}
