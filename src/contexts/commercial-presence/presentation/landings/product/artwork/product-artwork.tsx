import type { MediaView } from "../../../../contracts";
import { CommercialMedia } from "../../../components/media/commercial-media";
import { TiltSurface } from "../../../motion/components/tilt-surface";
import styles from "./product-artwork.module.css";

export function ProductArtwork({
  media,
  featured = false,
}: {
  readonly media: MediaView;
  readonly featured?: boolean;
}) {
  return (
    <figure className={styles.visual}>
      <TiltSurface variant={featured ? "showcase" : "default"}>
        <CommercialMedia media={media} priority />
      </TiltSurface>
    </figure>
  );
}
