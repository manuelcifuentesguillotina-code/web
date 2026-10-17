import "server-only";
import type { StructuredObject } from "@/contexts/commercial-presence/contracts";
import { composeCommercialPresence } from "../compose-commercial-presence";
import { getSiteConfig } from "../../configuration/site-config";
import { resolveSharingImage } from "../sharing/resolve-sharing-image";

export function composeStructuredData(path: string): StructuredObject {
  const app = composeCommercialPresence();
  const document = app.document(path);
  if (!document)
    throw new Error("Documento estructurado no encontrado: " + path);
  const data = app.structuredData(
    path,
    getSiteConfig().origin,
    resolveSharingImage(document.seo.image),
  );
  if (!data) throw new Error("Documento estructurado no resuelto: " + path);
  return data;
}
