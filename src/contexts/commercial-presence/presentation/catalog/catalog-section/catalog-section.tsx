import type { ReactElement } from "react";
import type { HomeView } from "../../../contracts";
import { SectionHeading } from "../../components/section-heading/section-heading";
import { ArrowIcon } from "../../components/icons/arrow-icon";
import { ProductGrid } from "../product-grid/product-grid";
import { sectionIds } from "../../navigation/section-links";
import styles from "./catalog-section.module.css";

export function CatalogSection({
  view,
}: {
  readonly view: HomeView;
}): ReactElement {
  return (
    <section className={styles.section} id={sectionIds.catalog}>
      <div className="container">
        <div data-entrance>
          <SectionHeading heading={view.copy.catalog.heading} />
        </div>
        <nav className={styles.navigation} aria-label="Líneas de productos">
          {view.groups.map((group) => (
            <a key={group.id} href={"#" + group.id}>
              {group.name}
              <ArrowIcon diagonal={false} />
            </a>
          ))}
        </nav>
        {view.groups.map((group) => (
          <section className={styles.group} key={group.id} id={group.id}>
            <div className={styles.heading}>
              <h3 className="short-copy">{group.name}</h3>
            </div>
            <ProductGrid products={group.products} />
          </section>
        ))}
      </div>
    </section>
  );
}
