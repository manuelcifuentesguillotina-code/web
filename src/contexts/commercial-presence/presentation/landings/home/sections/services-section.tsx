import type { ReactElement } from "react";
import type { HomeView } from "../../../../contracts";
import { CommercialMedia } from "../../../components/media/commercial-media";
import { SectionHeading } from "../../../components/section-heading/section-heading";
import { ContactActionView } from "../../../contact/components/contact-action";
import { sectionIds } from "../../../navigation/section-links";
import styles from "./services-section.module.css";

export function ServicesSection({
  view,
}: {
  readonly view: HomeView;
}): ReactElement {
  return (
    <section className={"container " + styles.section} id={sectionIds.services}>
      <div data-entrance>
        <SectionHeading
          {...view.copy.services}
          aside={<p className="short-copy">{view.company.production}</p>}
        />
      </div>
      <div className={styles.grid}>
        {view.services.map((service, index) => (
          <article className={styles.service} key={service.id} data-entrance>
            <div className={styles.image}>
              <CommercialMedia media={service.media} />
              <span className={styles.number}>0{index + 1}</span>
            </div>
            <div className={styles.body}>
              <h3 className="short-copy">{service.name}</h3>
              <p className="short-copy">{service.description}</p>
              <ContactActionView action={service.contact} variant="outline" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
