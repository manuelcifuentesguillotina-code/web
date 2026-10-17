import type { ReactElement, ReactNode } from "react";
import type {
  CompanyView,
  ContactAction,
  MarketingCopy,
  CatalogNavigationGroup,
  DiscoveryLink,
} from "../../../contracts";
import { SiteHeader } from "../header/site-header";
import { CompanyFooter } from "../footer/company-footer";
import { MotionSurface } from "../../motion/components/motion-surface";
import { ContactDock } from "../../contact/dock/contact-dock";
import { MobileActions } from "../../navigation/mobile/mobile-actions";

interface SiteShellProps {
  readonly discovery: readonly DiscoveryLink[];
  readonly company: CompanyView;
  readonly copy: MarketingCopy;
  readonly navigation: readonly CatalogNavigationGroup[];
  readonly currentProductId?: string;
  readonly children: ReactNode;
  readonly home?: boolean;
  readonly contact?: ContactAction;
}

export function SiteShell({
  discovery,
  company,
  copy,
  navigation,
  currentProductId,
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
      <CompanyFooter
        company={company}
        copy={copy.footer}
        discovery={discovery}
      />
      <ContactDock action={contact ?? company.contact} />
      <MobileActions
        groups={navigation}
        copy={copy}
        contact={contact ?? company.contact}
        companyContact={company.contact}
        currentProductId={currentProductId}
        home={home}
      />
    </>
  );
}
