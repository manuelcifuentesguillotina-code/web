import "server-only";
import { composeCommercialPresence } from "../compose-commercial-presence";
import { loadSharingAssets } from "./load-sharing-assets";

export async function composeBrandImage(): Promise<string> {
  const logo = composeCommercialPresence().home().company.logo;
  if (logo.status !== "ready")
    throw new Error("Identidad gráfica no disponible");
  return (await loadSharingAssets(logo.src)).artwork;
}
