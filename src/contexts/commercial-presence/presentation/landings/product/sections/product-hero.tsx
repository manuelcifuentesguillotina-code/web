import type { ReactElement } from "react";
import type { ProductLandingView } from "../../../../contracts";
import { CommercialMedia } from "../../../components/media/commercial-media";
import { ContactActionView } from "../../../contact/components/contact-action";
import { ArrowIcon } from "../../../components/icons/arrow-icon";
import { TiltSurface } from "../../../motion/components/tilt-surface";
import { sectionIds } from "../../../navigation/section-links";
import styles from "./product-hero.module.css";
import { PricePanel } from "../../../pricing/price-panel";
import { Breadcrumbs } from "../../../navigation/breadcrumbs/breadcrumbs";

export function ProductHero({
  view,
}: {
  readonly view: ProductLandingView;
}): ReactElement {
  const { product, company } = view;
  return (
    <section className={"container " + styles.section} id={sectionIds.hero}>
      <Breadcrumbs items={view.breadcrumbs} />
      <div className={styles.grid}>
        <div className={styles.copy}>
          <h1 className={styles.title + " short-copy"}>{product.name}</h1>
          <PricePanel price={product.price} />
          <div className={styles.offer + " product-offer"}>
            <div className={styles.benefit}>
              <h2>{product.contact.benefit.label}</h2>
              <ArrowIcon />
            </div>
            <p className="short-copy">{product.contact.benefit.scope}</p>
            <ContactActionView action={product.contact} variant="ink" />
          </div>
          <p className={styles.production + " short-copy"}>
            {company.production}
          </p>
        </div>
        <figure className={styles.visual}>
          <TiltSurface>
            <CommercialMedia media={product.media} priority />
          </TiltSurface>
        </figure>
      </div>
    </section>
  );
}
