import type { ReactElement } from "react";
import type { CompanyView, MarketingCopy } from "../../../contracts";
import { ContactActionView } from "../../contact/components/contact-action";
import { ArrowIcon } from "../../components/icons/arrow-icon";
import { sectionIds } from "../../navigation/section-links";
import styles from "./company-footer.module.css";

export function CompanyFooter({
  company,
  copy,
}: {
  readonly company: CompanyView;
  readonly copy: MarketingCopy["footer"];
}): ReactElement {
  return (
    <footer id={sectionIds.visit} className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className={styles.heading + " short-copy"}>{copy.heading}</h2>
          </div>
          <div className={styles.contact}>
            <p>{copy.channel}</p>
            <ContactActionView action={company.contact} />
          </div>
        </div>
        <div className={styles.details}>
          <div>
            <h3 className={styles.address + " short-copy"}>{company.visit}</h3>
            <p className={styles.hours + " short-copy"}>{company.hours}</p>
          </div>
          <p className={styles.production + " short-copy"}>
            {company.production}
          </p>
        </div>
        <div className={styles.bottom}>
          <span>{company.name}</span>
          <a href="#contenido">
            Volver arriba <ArrowIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
