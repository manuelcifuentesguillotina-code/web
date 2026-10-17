import type { ReactElement } from "react";
import type { HomeView } from "../../../contracts";
import { SiteShell } from "../../layout/shell/site-shell";
import { HeroSection } from "./sections/hero-section";
import { CraftRibbon } from "./sections/craft-ribbon";
import { ServicesSection } from "./sections/services-section";
import { CatalogSection } from "../../catalog/catalog-section/catalog-section";
import { ProcessSection } from "./sections/process-section";

export function HomeLanding({ view }: { readonly view: HomeView }): ReactElement {
  return <SiteShell company={view.company} copy={view.copy} home>
    <HeroSection view={view} />
    <CraftRibbon items={view.copy.ribbon} />
    <ServicesSection view={view} />
    <CatalogSection view={view} />
    <ProcessSection view={view} />
  </SiteShell>;
}
