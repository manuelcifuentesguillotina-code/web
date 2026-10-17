import type { ReactElement } from "react";
import type { Benefit, MediaView } from "../../../../contracts";
import { CommercialMedia } from "../../../components/media/commercial-media";
import { DiscountBadge } from "../../../contact/components/discount-badge";
import { TiltSurface } from "../../../motion/components/tilt-surface";
import styles from "./hero-artwork.module.css";

interface HeroArtworkProps {
  readonly media: MediaView;
  readonly benefit: Benefit;
  readonly caption: string;
}

export function HeroArtwork({
  media,
  benefit,
  caption,
}: HeroArtworkProps): ReactElement {
  return (
    <figure className={styles.art}>
      <TiltSurface>
        <CommercialMedia media={media} priority />
      </TiltSurface>
      <div className={styles.badge}>
        <DiscountBadge benefit={benefit} />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
