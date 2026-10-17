import type { TopicLandingView } from "../../../contracts";
import { SiteShell } from "../../layout/shell/site-shell";
import { ProductGrid } from "../../catalog/product-grid/product-grid";
import { TopicHero } from "./sections/topic-hero";
import styles from "./topic-landing.module.css";

export function TopicLanding({ view }: { readonly view: TopicLandingView }) {
  return (
    <SiteShell
      currentPath={view.document.seo.path}
      company={view.company}
      copy={view.copy}
      navigation={view.navigation}
      discovery={view.discovery}
      contact={view.contact}
    >
      <TopicHero view={view} />
      <section className={"container " + styles.products}>
        <h2 className={styles.heading}>{view.selectionHeading}</h2>
        <ProductGrid products={view.products} />
      </section>
    </SiteShell>
  );
}
