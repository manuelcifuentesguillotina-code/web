import type { ReactElement } from "react";
import styles from "./craft-ribbon.module.css";

export function CraftRibbon({ items }: { readonly items: readonly string[] }): ReactElement {
  return <div className={styles.ribbon}>
    <div className={styles.track}>
      {[false, true].map((duplicate) => <div className={styles.group} key={String(duplicate)} aria-hidden={duplicate || undefined}>
        {items.map((item) => <span key={item}>{item}<span aria-hidden="true">✳</span></span>)}
      </div>)}
    </div>
  </div>;
}
