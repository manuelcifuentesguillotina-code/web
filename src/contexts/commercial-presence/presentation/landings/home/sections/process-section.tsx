import type { ReactElement } from "react";
import type { HomeView } from "../../../../contracts";
import { ContactActionView } from "../../../contact/components/contact-action";
import { DiscountBadge } from "../../../contact/components/discount-badge";
import styles from "./process-section.module.css";

export function ProcessSection({ view }: { readonly view: HomeView }): ReactElement {
  const copy = view.copy.process;
  return <section className={styles.section}>
    <div className={"container " + styles.inner}>
      <div className={styles.pitch} data-entrance>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 className={styles.heading + " short-copy"}>{copy.heading}</h2>
        <div className={styles.contact}><ContactActionView action={view.company.contact} variant="ink" /></div>
      </div>
      <div className={styles.steps} data-entrance>
        {copy.steps.map((step, index) => <article className={styles.step} key={step.id}>
          <span>0{index + 1}</span><div><h3 className="short-copy">{step.title}</h3><p className="short-copy">{step.detail}</p></div>
        </article>)}
      </div>
      <div className={styles.badge}><DiscountBadge benefit={view.company.contact.benefit} /></div>
    </div>
  </section>;
}
