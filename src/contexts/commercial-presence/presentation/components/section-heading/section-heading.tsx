import type { ReactElement } from "react";
import styles from "./section-heading.module.css";

interface SectionHeadingProps {
  readonly heading: string;
}

export function SectionHeading({ heading }: SectionHeadingProps): ReactElement {
  return (
    <div className={styles.row}>
      <div>
        <h2 className={styles.heading + " short-copy"}>{heading}</h2>
      </div>
    </div>
  );
}
