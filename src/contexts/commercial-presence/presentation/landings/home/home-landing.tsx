import type { ReactElement } from "react";
import type { HomeView } from "../../../contracts";
import { SiteShell } from "../../layout/shell/site-shell";
import { HeroSection } from "./sections/hero-section";
import { CraftRibbon } from "./sections/craft-ribbon";
import { ServicesSection } from "./sections/services-section";
import { CatalogSection } from "../../catalog/catalog-section/catalog-section";

export function HomeLanding({
  view,
}: {
  readonly view: HomeView;
}): ReactElement {
  return (
    <SiteShell
      currentPath={view.seo.path}
      company={view.company}
      copy={view.copy}
      navigation={view.navigation}
      discovery={view.discovery}
      home
    >
      <HeroSection view={view} />
      <CraftRibbon items={view.copy.ribbon} />
      <ServicesSection view={view} />
      <CatalogSection view={view} />
    </SiteShell>
  );
}
