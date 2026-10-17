import type { PublishedPrice } from "../../contracts";
import styles from "./price-panel.module.css";
import { PriceReferenceDetails } from "./price-reference-details";

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
      <p className={styles.amount + " short-copy"}>{price.label}</p>
      {price.status !== "quote" && (
        <p className={styles.basis + " short-copy"}>
          {price.basis} · {price.taxLabel}
        </p>
      )}
      {price.status === "reference" &&
        (compact ? (
          <p className={styles.source + " short-copy"}>
            {price.reference.provider} · externa
          </p>
        ) : (
          <PriceReferenceDetails reference={price.reference} />
        ))}
    </div>
  );
}
