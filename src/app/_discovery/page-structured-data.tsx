import { composeCommercialPresence } from "@/composition/commercial-presence/compose-commercial-presence";
import { getSiteConfig } from "@/composition/configuration/site-config";
import { serializeStructuredData } from "./serialize-structured-data";

export function PageStructuredData({ path }: { readonly path: string }) {
  const data = composeCommercialPresence().structuredData(
    path,
    getSiteConfig().origin,
  );
  if (!data) throw new Error("Documento estructurado no encontrado: " + path);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeStructuredData(data) }}
    />
  );
}
