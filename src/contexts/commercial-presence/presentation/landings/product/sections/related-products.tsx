import type { ReactElement } from "react";
import type { ProductLandingView } from "../../../../contracts";
import { ProductGrid } from "../../../catalog/product-grid/product-grid";
import styles from "./related-products.module.css";

export function RelatedProducts({ view }: { readonly view: ProductLandingView }): ReactElement | null {
  if (!view.related.length) return null;
  return <section className={styles.section}>
    <div className="container">
      <h2 className={styles.heading + " short-copy"}>{view.copy.product.related}</h2>
      <ProductGrid products={view.related} />
    </div>
  </section>;
}
