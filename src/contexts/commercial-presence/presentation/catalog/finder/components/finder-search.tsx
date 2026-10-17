"use client";

import { useRef } from "react";
import type { MarketingCopy } from "../../../../contracts";
import styles from "./finder-search.module.css";

interface FinderSearchProps {
  readonly query: string;
  readonly count: number;
  readonly copy: MarketingCopy["finder"];
  readonly onChange: (value: string) => void;
  readonly onSubmit: () => void;
}

export function FinderSearch({
  query,
  count,
  copy,
  onChange,
  onSubmit,
}: FinderSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className={styles.search}
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        inputRef.current?.blur();
        onSubmit();
      }}
    >
      <label htmlFor="product-search">{copy.search}</label>
      <div className={styles.field}>
        <input
          ref={inputRef}
          id="product-search"
          type="search"
          value={query}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
          aria-controls="product-results"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              inputRef.current?.focus({ preventScroll: true });
            }}
            aria-label={copy.clear}
          >
            ×
          </button>
        )}
      </div>
      <p id="product-results-count" aria-live="polite" aria-atomic="true">
        {count} {count === 1 ? copy.singular : copy.plural}
      </p>
    </form>
  );
}
