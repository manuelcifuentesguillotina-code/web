import { ImageResponse } from "next/og";
import { composeCommercialPresence } from "@/composition/commercial-presence/compose-commercial-presence";
import { composeSharingCard } from "@/composition/commercial-presence/sharing/compose-sharing-card";
import { SharingCard } from "@/contexts/commercial-presence/presentation/sharing/sharing-card";

export function generateStaticParams() {
  return composeCommercialPresence()
    .documents()
    .map((page) => ({ key: page.id }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const card = await composeSharingCard((await params).key);
  if (!card) return new Response("Imagen no encontrada", { status: 404 });
  return new ImageResponse(<SharingCard view={card.view} />, {
    width: 1200,
    height: 630,
    fonts: [{ name: "Anton", data: card.font, weight: 400, style: "normal" }],
    headers: {
      "Cache-Control":
        "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
