import type { ReactElement } from "react";
import type {
  CompanyView,
  ContactAction,
  DiscoveryLink,
  MarketingCopy,
} from "../../../contracts";
import { DiscoveryLinks } from "../../navigation/discovery/discovery-links";
import { ContactActionView } from "../../contact/components/contact-action";
import { ArrowIcon } from "../../components/icons/arrow-icon";
import { sectionIds } from "../../navigation/section-links";
import styles from "./company-footer.module.css";

export function CompanyFooter({
  discovery,
  contact,
  company,
  copy,
}: {
  readonly discovery: readonly DiscoveryLink[];
  readonly contact: ContactAction;
  readonly company: CompanyView;
  readonly copy: MarketingCopy["footer"];
}): ReactElement {
  return (
    <footer id={sectionIds.visit} className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div>
            <h2 className={styles.heading + " short-copy"}>{copy.heading}</h2>
          </div>
          <div className={styles.contact}>
            <ContactActionView action={contact} />
          </div>
        </div>
        <div className={styles.details}>
          <div>
            <h3 className={styles.address + " short-copy"}>{company.visit}</h3>
            <p className={styles.hours + " short-copy"}>{company.hours}</p>
            <a
              className={styles.directions}
              href={company.directions.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {company.directions.name}
              <ArrowIcon />
            </a>
          </div>
          <p className={styles.production + " short-copy"}>
            {company.production}
          </p>
        </div>
        <DiscoveryLinks links={discovery} />
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
