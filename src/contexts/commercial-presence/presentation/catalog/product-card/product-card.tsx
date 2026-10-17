import Link from "next/link";
import type { ReactElement } from "react";
import type { ProductView } from "../../../contracts";
import { CommercialMedia } from "../../components/media/commercial-media";
import { ArrowIcon } from "../../components/icons/arrow-icon";
import { ContactActionView } from "../../contact/components/contact-action";
import styles from "./product-card.module.css";
import { PricePanel } from "../../pricing/price-panel";

export function ProductCard({
  product,
}: {
  readonly product: ProductView;
}): ReactElement {
  return (
    <article className={styles.card + " product-card"} data-entrance>
      <div className={styles.visual}>
        <CommercialMedia
          media={product.media}
          sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
        />
        <span className={styles.arrow} aria-hidden="true">
          <ArrowIcon />
        </span>
      </div>
      <div className={styles.body}>
        <div className={styles.details}>
          <p className={styles.category}>{product.category}</p>
          <h3 className={styles.title + " short-copy"}>
            <Link href={product.href}>{product.name}</Link>
          </h3>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.price}>
            <PricePanel price={product.price} compact />
          </div>
          <span className={styles.discover} aria-hidden="true">
            Ver producto <ArrowIcon diagonal={false} />
          </span>
        </div>
        <div className={styles.contact}>
          <ContactActionView action={product.contact} variant="outline" />
        </div>
      </div>
    </article>
  );
}
