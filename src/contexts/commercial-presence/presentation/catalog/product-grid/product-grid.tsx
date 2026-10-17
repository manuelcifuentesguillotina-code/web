import type { ReactElement } from "react";
import type { ProductView } from "../../../contracts";
import { ProductCard } from "../product-card/product-card";
import styles from "./product-grid.module.css";

export function ProductGrid({
  products,
}: {
  readonly products: readonly ProductView[];
}): ReactElement {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
