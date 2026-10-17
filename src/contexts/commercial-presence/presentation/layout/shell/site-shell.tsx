import type { ReactElement, ReactNode } from "react";
import type {
  CompanyView,
  ContactAction,
  MarketingCopy,
} from "../../../contracts";
import { SiteHeader } from "../header/site-header";
import { CompanyFooter } from "../footer/company-footer";
import { MotionSurface } from "../../motion/components/motion-surface";
import { ContactDock } from "../../contact/dock/contact-dock";

interface SiteShellProps {
  readonly company: CompanyView;
  readonly copy: MarketingCopy;
  readonly children: ReactNode;
  readonly home?: boolean;
  readonly contact?: ContactAction;
}

export function SiteShell({
  company,
  copy,
  children,
  home = false,
  contact,
}: SiteShellProps): ReactElement {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Ir al contenido
      </a>
      <SiteHeader company={company} copy={copy.navigation} home={home} />
      <MotionSurface>
        <main id="contenido">{children}</main>
      </MotionSurface>
      <CompanyFooter company={company} copy={copy.footer} />
      <ContactDock action={contact ?? company.contact} />
    </>
  );
}
