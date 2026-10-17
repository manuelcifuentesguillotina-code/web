import type { ReactElement, ReactNode } from "react";
import type {
  CompanyView,
  ContactAction,
  MarketingCopy,
  CatalogNavigationGroup,
  DiscoveryNavigationLink,
} from "../../../contracts";
import { SiteHeader } from "../header/site-header";
import { CompanyFooter } from "../footer/company-footer";
import { MotionSurface } from "../../motion/components/motion-surface";
import { ContactDock } from "../../contact/dock/contact-dock";
import { MobileActions } from "../../navigation/mobile/mobile-actions";

interface SiteShellProps {
  readonly discovery: readonly DiscoveryNavigationLink[];
  readonly company: CompanyView;
  readonly copy: MarketingCopy;
  readonly navigation: readonly CatalogNavigationGroup[];
  readonly currentProductId?: string;
  readonly currentPath: string | null;
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
  currentPath,
  children,
  home = false,
  contact,
}: SiteShellProps): ReactElement {
  const activeContact = contact ?? company.contact;
  return (
    <>
      <a className="skip-link" href="#contenido">
        Ir al contenido
      </a>
      <SiteHeader
        company={company}
        copy={copy.navigation}
        home={home}
        contact={activeContact}
      />
      <MotionSurface>
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
      </MotionSurface>
      <CompanyFooter
        company={company}
        copy={copy.footer}
        discovery={discovery}
        contact={activeContact}
      />
      <ContactDock action={activeContact} />
      <MobileActions
        groups={navigation}
        copy={copy}
        contact={activeContact}
        directions={company.directions}
        services={discovery.filter((item) => item.kind === "service")}
        currentProductId={currentProductId}
        currentPath={currentPath}
        home={home}
      />
    </>
  );
}
