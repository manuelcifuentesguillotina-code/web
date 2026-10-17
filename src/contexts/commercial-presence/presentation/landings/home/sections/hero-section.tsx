import type { ReactElement } from "react";
import type { HomeView } from "../../../../contracts";
import { ContactActionView } from "../../../contact/components/contact-action";
import { ArrowIcon } from "../../../components/icons/arrow-icon";
import { sectionHref, sectionIds } from "../../../navigation/section-links";
import { HeroArtwork } from "./hero-artwork";
import styles from "./hero-section.module.css";

export function HeroSection({
  view,
}: {
  readonly view: HomeView;
}): ReactElement {
  return (
    <section className={styles.hero} id={sectionIds.hero}>
      <div className={"container " + styles.grid}>
        <div className={styles.copy}>
          <p className={"eyebrow " + styles.kicker}>
            <span aria-hidden="true" />
            {view.copy.hero.eyebrow}
          </p>
          <h1 className={styles.title + " short-copy"}>
            {view.heading.split("\n").map((line, index) => (
              <span
                key={line}
                className={index === 1 ? styles.accent : undefined}
              >
                {line}
              </span>
            ))}
          </h1>
          <p className={styles.intro + " short-copy"}>{view.intro}</p>
          <div className={styles.actions}>
            <div className={styles.offer + " hero-offer"}>
              <p>{view.company.contact.benefit.label}</p>
              <ContactActionView action={view.company.contact} />
            </div>
            <a className={styles.browse} href={sectionHref("catalog", true)}>
              {view.copy.hero.browse}
              <ArrowIcon diagonal={false} />
            </a>
          </div>
        </div>
        <HeroArtwork
          media={view.heroMedia}
          benefit={view.company.contact.benefit}
          caption={view.copy.hero.artCaption}
        />
      </div>
      <div className={"container " + styles.foot}>
        <a href={sectionHref("visit", true)}>
          <ArrowIcon />
          {view.company.address}
        </a>
        <span>{view.company.serviceArea}</span>
      </div>
    </section>
  );
}
