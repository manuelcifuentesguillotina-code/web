import type { ReactElement } from "react";
import type { ProductLandingView } from "../../../../contracts";
import { sectionIds } from "../../../navigation/section-links";
import styles from "./product-hero.module.css";
import { PricePanel } from "../../../pricing/price-panel";
import { ProductOffer } from "../offer/product-offer";
import { ProductArtwork } from "../artwork/product-artwork";

export function ProductHero({
  view,
}: {
  readonly view: ProductLandingView;
}): ReactElement {
  const { product, company } = view;
  return (
    <section className={"container " + styles.section} id={sectionIds.hero}>
      <div className={styles.grid}>
        <div className={styles.copy}>
          <h1 className={styles.title + " short-copy"}>{product.name}</h1>
          <PricePanel price={product.price} />
          <ProductOffer contact={product.contact} />
          <p className={styles.production + " short-copy"}>
            {company.production}
          </p>
        </div>
        <ProductArtwork media={product.media} />
      </div>
    </section>
  );
}
