import type { ReactElement } from "react";
import styles from "./craft-ribbon.module.css";

export function CraftRibbon({
  items,
}: {
  readonly items: readonly string[];
}): ReactElement {
  return (
    <div className={styles.ribbon}>
      <input
        className={styles.toggle}
        id="pausar-cinta"
        type="checkbox"
        aria-label="Pausar movimiento"
      />
      <label
        className={styles.control}
        htmlFor="pausar-cinta"
        aria-hidden="true"
      >
        <svg
          className={styles.pause}
          viewBox="0 0 20 20"
          width="16"
          height="16"
        >
          <path d="M5 3v14M15 3v14" stroke="currentColor" strokeWidth="4" />
        </svg>
        <svg className={styles.play} viewBox="0 0 20 20" width="16" height="16">
          <path d="m5 2 12 8-12 8Z" fill="currentColor" />
        </svg>
      </label>
      <div className={styles.track}>
        {[false, true].map((duplicate) => (
          <div
            className={styles.group}
            key={String(duplicate)}
            aria-hidden={duplicate || undefined}
          >
            {items.map((item) => (
              <span key={item}>
                {item}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M12 0v24M0 12h24M3.5 3.5l17 17m0-17-17 17"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
