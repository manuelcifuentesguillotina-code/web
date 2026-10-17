import type { ReactElement } from "react";
import type { CompanyView } from "../../contracts";
import { ContactActionView } from "../contact/contact-action";

export function CompanyFooter({ company }: { readonly company: CompanyView }): ReactElement {
  return (
    <footer id="visitanos" className="company-footer">
      <div>
        <h2 className="visit-address short-copy">{company.visit}</h2>
        <p className="short-copy">{company.hours}</p>
      </div>
      <div className="footer-contact">
        <p className="short-copy">{company.production}</p>
        <ContactActionView action={company.contact} />
      </div>
    </footer>
  );
}
