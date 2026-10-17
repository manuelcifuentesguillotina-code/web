import type { ReactElement } from "react";
import type { HomeView } from "../../../../contracts";
import { CommercialMedia } from "../../../components/media/commercial-media";
import { ContactActionView } from "../../../contact/components/contact-action";
import { DiscountBadge } from "../../../contact/components/discount-badge";
import { ArrowIcon } from "../../../components/icons/arrow-icon";
import { TiltSurface } from "../../../motion/components/tilt-surface";
import { sectionHref, sectionIds } from "../../../navigation/section-links";
import styles from "./hero-section.module.css";

export function HeroSection({ view }: { readonly view: HomeView }): ReactElement {
  return <section className={styles.hero} id={sectionIds.hero}>
    <div className={"container " + styles.grid}>
      <div className={styles.copy}>
        <p className={"eyebrow " + styles.kicker}><span aria-hidden="true" />{view.copy.hero.eyebrow}</p>
        <h1 className={styles.title + " short-copy"}>{view.heading.split("\n").map((line, index) =>
          <span key={line} className={index === 1 ? styles.accent : undefined}>{line}</span>)}</h1>
        <p className={styles.intro + " short-copy"}>{view.intro}</p>
        <div className={styles.actions}>
          <div className={styles.offer + " hero-offer"}>
            <p>{view.company.contact.benefit.label}</p>
            <ContactActionView action={view.company.contact} />
          </div>
          <a className={styles.browse} href={sectionHref("catalog", true)}>{view.copy.hero.browse}<ArrowIcon diagonal={false} /></a>
        </div>
      </div>
      <figure className={styles.art}>
        <TiltSurface><CommercialMedia media={view.heroMedia} priority /></TiltSurface>
        <div className={styles.badge}><DiscountBadge benefit={view.company.contact.benefit} /></div>
        <figcaption>{view.copy.hero.artCaption}</figcaption>
      </figure>
    </div>
    <div className={"container " + styles.foot}>
      <a href={sectionHref("visit", true)}><span aria-hidden="true">↗</span>{view.company.address}</a>
      <span>{view.company.serviceArea}</span>
    </div>
  </section>;
}
