import type { ReactElement } from "react";
import type { Benefit } from "../../../contracts";
import styles from "./discount-badge.module.css";

export function DiscountBadge({ benefit }: { readonly benefit: Benefit }): ReactElement {
  return (
    <div className={styles.badge} aria-label={benefit.label}>
      <span className={styles.value} aria-hidden="true">{benefit.percent}<small>%</small></span>
      <span className={styles.scope}>{benefit.scope}</span>
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="m12 0 2.4 7.8L22 4l-3.8 7.6L24 14l-8 1-1 9-3.7-7L4 21l3-8-7-3 8-1Z" fill="currentColor" /></svg>
    </div>
  );
}
