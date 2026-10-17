"use client";

import type { ReactElement, RefObject } from "react";
import type {
  CatalogNavigationGroup,
  ContactAction,
  MarketingCopy,
} from "../../../../contracts";
import { ContactActionView } from "../../../contact/components/contact-action";
import { sectionHref } from "../../../navigation/section-links";
import { useProductSearch } from "../hooks/use-product-search";
import { ProductResults } from "./product-results";
import styles from "./product-finder.module.css";

interface ProductFinderProps {
  readonly dialogRef: RefObject<HTMLDialogElement | null>;
  readonly groups: readonly CatalogNavigationGroup[];
  readonly copy: MarketingCopy;
  readonly contact: ContactAction;
  readonly home: boolean;
  readonly currentProductId?: string;
  readonly onDismiss: () => void;
  readonly onClosed: () => void;
}

export function ProductFinder({
  dialogRef,
  groups,
  copy,
  contact,
  home,
  currentProductId,
  onDismiss,
  onClosed,
}: ProductFinderProps): ReactElement {
  const search = useProductSearch(groups);
  function afterClose(): void {
    search.clear();
    onClosed();
  }
  return (
    <dialog
      ref={dialogRef}
      id="product-finder"
      className={styles.dialog}
      aria-labelledby="product-finder-heading"
      onClose={afterClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onDismiss();
      }}
    >
      <div className={styles.sheet}>
        <header className={styles.header}>
          <h2 id="product-finder-heading">{copy.navigation.products}</h2>
          <button
            className={styles.close}
            onClick={onDismiss}
            aria-label={copy.finder.close}
            type="button"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
        </header>
        <div className={styles.search} role="search">
          <label htmlFor="product-search">{copy.finder.search}</label>
          <div className={styles.field}>
            <input
              id="product-search"
              type="search"
              value={search.query}
              onChange={(event) => search.setQuery(event.target.value)}
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="search"
              aria-controls="product-results"
            />
            {search.query && (
              <button
                type="button"
                onClick={search.clear}
                aria-label={copy.finder.clear}
              >
                ×
              </button>
            )}
          </div>
          <p aria-live="polite" aria-atomic="true">
            {search.count}{" "}
            {search.count === 1 ? copy.finder.singular : copy.finder.plural}
          </p>
        </div>
        <div className={styles.scroll}>
          {search.count === 0 && (
            <p className={styles.empty + " short-copy"}>{copy.finder.empty}</p>
          )}
          <ProductResults
            groups={search.results}
            currentProductId={currentProductId}
            onSelect={onDismiss}
          />
          <nav
            className={styles.quickLinks}
            aria-label={copy.navigation.services}
          >
            <a href={sectionHref("services", home)} onClick={onDismiss}>
              {copy.navigation.services}
            </a>
            <a href={sectionHref("visit", home)} onClick={onDismiss}>
              {copy.navigation.visit}
            </a>
          </nav>
        </div>
        <div className={styles.contact}>
          <ContactActionView action={contact} />
        </div>
      </div>
    </dialog>
  );
}
