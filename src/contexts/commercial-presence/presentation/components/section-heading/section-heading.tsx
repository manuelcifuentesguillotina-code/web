import type { ReactElement, ReactNode } from "react";
import styles from "./section-heading.module.css";

interface SectionHeadingProps {
  readonly eyebrow: string;
  readonly heading: string;
  readonly aside?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  heading,
  aside,
}: SectionHeadingProps): ReactElement {
  return (
    <div className={styles.row}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className={styles.heading + " short-copy"}>{heading}</h2>
      </div>
      {aside && <div className={styles.aside}>{aside}</div>}
    </div>
  );
}
