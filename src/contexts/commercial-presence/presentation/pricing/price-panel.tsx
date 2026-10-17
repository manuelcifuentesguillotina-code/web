import type { PublishedPrice } from "../../contracts";
import styles from "./price-panel.module.css";

export function PricePanel({
  price,
  compact = false,
}: {
  readonly price: PublishedPrice;
  readonly compact?: boolean;
}) {
  return (
    <div
      className={styles.price + (compact ? " " + styles.compact : "")}
      data-price-status={price.status}
    >
      <p className={styles.amount}>{price.label}</p>
      {price.status === "approved" && (
        <p className={styles.basis}>
          {price.basis} · {price.taxLabel}
        </p>
      )}
    </div>
  );
}
