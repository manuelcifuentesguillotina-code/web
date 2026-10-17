import Link from "next/link";
import type { ReactElement } from "react";
import type { ProductLandingView } from "../../../../contracts";
import { CommercialMedia } from "../../../components/media/commercial-media";
import { ContactActionView } from "../../../contact/components/contact-action";
import { ArrowIcon } from "../../../components/icons/arrow-icon";
import { TiltSurface } from "../../../motion/components/tilt-surface";
import { sectionHref, sectionIds } from "../../../navigation/section-links";
import styles from "./product-hero.module.css";

export function ProductHero({
  view,
}: {
  readonly view: ProductLandingView;
}): ReactElement {
  const { product, company, copy } = view;
  return (
    <section className={"container " + styles.section} id={sectionIds.hero}>
      <nav className={styles.breadcrumb} aria-label="Ruta de navegación">
        <Link href={sectionHref("catalog", false)}>
          <ArrowIcon diagonal={false} />
          {copy.product.back}
        </Link>
        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </nav>
      <div className={styles.grid}>
        <figure className={styles.visual}>
          <TiltSurface>
            <CommercialMedia media={product.media} priority />
          </TiltSurface>
          <figcaption>{copy.hero.artCaption}</figcaption>
        </figure>
        <div className={styles.copy}>
          <p className="eyebrow">{product.category}</p>
          <h1 className={styles.title + " short-copy"}>{product.name}</h1>
          <p className={styles.description + " short-copy"}>
            {product.description}
          </p>
          {product.quantity && (
            <p className={styles.quantity + " short-copy"}>
              {copy.product.quantity}: {product.quantity}
            </p>
          )}
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
      </div>
    </section>
  );
}
