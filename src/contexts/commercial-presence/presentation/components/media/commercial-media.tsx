import type { ReactElement } from "react";
import Image from "next/image";
import type { MediaView } from "../../../contracts";
import styles from "./commercial-media.module.css";

interface MediaProps {
  readonly media: MediaView;
  readonly priority?: boolean;
  readonly sizes?: string;
}

export function CommercialMedia({ media, priority = false, sizes = "(max-width: 700px) 100vw, 50vw" }: MediaProps): ReactElement {
  if (media.status === "ready") {
    return <div className={styles.frame + " commercial-media"}>
      <Image src={media.src} alt={media.label} width={media.width} height={media.height}
        sizes={sizes} preload={priority} />
    </div>;
  }
  return <div className={styles.placeholder} role="img" aria-label={"Placeholder de imagen: " + media.label}>
    <span aria-hidden="true">+</span><span>Placeholder · {media.label}</span>
  </div>;
}
