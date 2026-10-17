import type { MediaView } from "../../../../contracts";
import { CommercialMedia } from "../../../components/media/commercial-media";
import { TiltSurface } from "../../../motion/components/tilt-surface";
import styles from "./product-artwork.module.css";

export function ProductArtwork({ media }: { readonly media: MediaView }) {
  return (
    <figure className={styles.visual}>
      <TiltSurface>
        <CommercialMedia media={media} priority />
      </TiltSurface>
    </figure>
  );
}
