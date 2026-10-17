import { ImageResponse } from "next/og";
import { composeBrandImage } from "@/composition/commercial-presence/sharing/compose-brand-image";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const artwork = await composeBrandImage();
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        {/* ImageResponse renders the approved SVG logo directly. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={artwork} width={size.width} height={size.height} />
      </div>
    ),
    size,
  );
}
