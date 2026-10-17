import type { PublishedPrice } from "../../contracts";
import styles from "./price-panel.module.css";

export function PricePanel({ price }: { readonly price: PublishedPrice }) {
  return (
    <div className={styles.price} data-price-status={price.status}>
      <p className={styles.amount}>{price.label}</p>
      {price.status === "approved" && (
        <p className={styles.basis}>
          {price.basis} · {price.taxLabel}
        </p>
      )}
    </div>
  );
}
