import { composeStructuredData } from "@/composition/commercial-presence/discovery/compose-structured-data";
import { serializeStructuredData } from "./serialize-structured-data";

export function PageStructuredData({ path }: { readonly path: string }) {
  const data = composeStructuredData(path);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeStructuredData(data) }}
    />
  );
}
