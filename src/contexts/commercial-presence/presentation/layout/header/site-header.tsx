import type { ReactElement } from "react";
import type { CompanyView, MarketingCopy } from "../../../contracts";
import { BrandLockup } from "../../brand/brand-lockup";
import { ContactActionView } from "../../contact/components/contact-action";
import { sectionHref } from "../../navigation/section-links";
import styles from "./site-header.module.css";

interface HeaderProps {
  readonly company: CompanyView;
  readonly copy: MarketingCopy["navigation"];
  readonly home: boolean;
}

export function SiteHeader({ company, copy, home }: HeaderProps): ReactElement {
  return (
    <header className={styles.header}>
      <div className={"container " + styles.inner}>
        <BrandLockup company={company} />
        <nav className={styles.navigation} aria-label="Navegación principal">
          <a href={sectionHref("catalog", home)}>{copy.products}</a>
          <a href={sectionHref("services", home)}>{copy.services}</a>
          <a href={sectionHref("visit", home)}>{copy.visit}</a>
        </nav>
        <div className={styles.contact}>
          <ContactActionView action={company.contact} variant="ink" />
        </div>
      </div>
    </header>
  );
}
