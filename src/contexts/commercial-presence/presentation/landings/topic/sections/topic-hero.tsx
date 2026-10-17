import type { TopicLandingView } from "../../../../contracts";
import { Breadcrumbs } from "../../../navigation/breadcrumbs/breadcrumbs";
import { CommercialMedia } from "../../../components/media/commercial-media";
import { ContactActionView } from "../../../contact/components/contact-action";
import { PricePanel } from "../../../pricing/price-panel";
import { sectionIds } from "../../../navigation/section-links";
import styles from "./topic-hero.module.css";

export function TopicHero({ view }: { readonly view: TopicLandingView }) {
  const { document, company, contact } = view;
  return (
    <section className={"container " + styles.hero} id={sectionIds.hero}>
      <Breadcrumbs items={document.breadcrumbs} />
      <div className={styles.grid}>
        <div className={styles.copy}>
          <h1 className={styles.title}>{document.heading}</h1>
          <p className={styles.lead}>{document.lead}</p>
          <PricePanel price={document.price} />
          <div className={styles.offer + " product-offer"}>
            <h2>{contact.benefit.label}</h2>
            <p>{contact.benefit.scope}</p>
            <ContactActionView action={contact} variant="ink" />
          </div>
          {document.kind === "local" && (
            <address className={styles.address}>
              <p>{company.address}</p>
              <p>{company.hours}</p>
            </address>
          )}
        </div>
        <div className={styles.visual}>
          <CommercialMedia media={document.media} priority />
        </div>
      </div>
    </section>
  );
}
