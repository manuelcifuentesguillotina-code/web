import type { ReactElement } from "react";
import Image from "next/image";
import type { MediaView } from "../contracts";

export function CommercialMedia({ media }: { readonly media: MediaView }): ReactElement {
  if (media.status === "ready") {
    return (
      <div className="commercial-media">
        <Image src={media.src} alt={media.label} width={media.width} height={media.height}
          sizes="(max-width: 700px) 100vw, 50vw" />
      </div>
    );
  }
  return (
    <div className="commercial-media media-placeholder" role="img" aria-label={"Placeholder de imagen: " + media.label}>
      <span className="placeholder-mark" aria-hidden="true">+</span>
      <span>Placeholder · imagen</span>
      <span className="placeholder-caption">{media.label}</span>
    </div>
  );
}
