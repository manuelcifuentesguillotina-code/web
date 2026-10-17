import Link from "next/link";
import type { ReactElement } from "react";
import type { CompanyView } from "../contracts";
import { CommercialMedia } from "./commercial-media";

export function SiteHeader({ company }: { readonly company: CompanyView }): ReactElement {
  return (
    <header className="site-header">
      <Link href="/" className="brand">
        {company.logo.status === "ready"
          ? <span className="brand-logo"><CommercialMedia media={company.logo} /></span>
          : <span className="logo-placeholder" aria-label={"Placeholder: " + company.logo.label}>LOGO<br />PENDIENTE</span>}
        <span>{company.name}</span>
      </Link>
      <a className="header-location" href="#visitanos">{company.address}</a>
    </header>
  );
}
