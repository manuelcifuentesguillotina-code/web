import { createHash } from "node:crypto";
import type { SharingCardContent } from "../../contracts";

export function createSharingRevision(
  content: SharingCardContent,
  assets: Readonly<Record<string, string>>,
): string {
  if (content.media.status !== "ready")
    throw new Error("Imagen social sin recurso aprobado");
  const asset = assets[content.media.src];
  if (!asset || !/^[a-f0-9]{64}$/.test(asset))
    throw new Error(
      "Revisión de recurso social inexistente: " + content.media.src,
    );
  return createHash("sha256")
    .update(JSON.stringify(content))
    .update(asset)
    .digest("hex")
    .slice(0, 20);
}
