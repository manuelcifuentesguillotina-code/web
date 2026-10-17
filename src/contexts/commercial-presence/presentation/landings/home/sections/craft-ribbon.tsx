import type { ReactElement } from "react";
import styles from "./craft-ribbon.module.css";

export function CraftRibbon({ items }: { readonly items: readonly string[] }): ReactElement {
  return <div className={styles.ribbon}>
    <div className={styles.track}>
      {[false, true].map((duplicate) => <div className={styles.group} key={String(duplicate)} aria-hidden={duplicate || undefined}>
        {items.map((item) => <span key={item}>{item}<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0v24M0 12h24M3.5 3.5l17 17m0-17-17 17" stroke="currentColor" strokeWidth="3" />
        </svg></span>)}
      </div>)}
    </div>
  </div>;
}
