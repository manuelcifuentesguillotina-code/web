import type { ReactElement } from "react";
import type { MediaView } from "../../../../contracts";
import { CommercialMedia } from "../../../components/media/commercial-media";
import { TiltSurface } from "../../../motion/components/tilt-surface";
import styles from "./hero-artwork.module.css";

interface HeroArtworkProps {
  readonly media: MediaView;
}

export function HeroArtwork({
  media,
}: HeroArtworkProps): ReactElement {
  return (
    <figure className={styles.art}>
      <TiltSurface>
        <CommercialMedia media={media} priority />
      </TiltSurface>
    </figure>
  );
}
