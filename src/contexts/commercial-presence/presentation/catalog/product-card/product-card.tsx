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
      <Link
        href={product.href}
        className={styles.visual}
        aria-label={"Ver " + product.name}
      >
        <CommercialMedia
          media={product.media}
          sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
        />
        <span className={styles.arrow}>
          <ArrowIcon />
        </span>
      </Link>
      <div className={styles.body}>
        <div className={styles.details}>
          <h3 className={styles.title + " short-copy"}>
            <Link href={product.href}>{product.name}</Link>
          </h3>
          <PricePanel price={product.price} compact />
        </div>
        <div className={styles.contact}>
          <ContactActionView action={product.contact} variant="outline" />
        </div>
      </div>
    </article>
  );
}
