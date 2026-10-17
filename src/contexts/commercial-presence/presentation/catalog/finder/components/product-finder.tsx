"use client";

import { useEffect, useRef, type ReactElement, type RefObject } from "react";
import type {
  CatalogNavigationGroup,
  ContactAction,
  DiscoveryLink,
  MarketingCopy,
} from "../../../../contracts";
import { ContactActionView } from "../../../contact/components/contact-action";
import { useProductSearch } from "../hooks/use-product-search";
import { ProductResults } from "./product-results";
import { FinderSearch } from "./finder-search";
import { FinderCategories } from "./finder-categories";
import { FinderServiceLinks } from "./finder-service-links";
import styles from "./product-finder.module.css";

interface ProductFinderProps {
  readonly dialogRef: RefObject<HTMLDialogElement | null>;
  readonly groups: readonly CatalogNavigationGroup[];
  readonly copy: MarketingCopy;
  readonly contact: ContactAction;
  readonly services: readonly DiscoveryLink[];
  readonly directions: DiscoveryLink;
  readonly currentProductId?: string;
  readonly currentPath: string | null;
  readonly onDismiss: () => void;
  readonly onSelect: () => void;
  readonly onClosed: () => void;
}

export function ProductFinder({
  dialogRef,
  groups,
  copy,
  contact,
  services,
  directions,
  currentProductId,
  currentPath,
  onDismiss,
  onSelect,
  onClosed,
}: ProductFinderProps): ReactElement {
  const search = useProductSearch(groups);
  const resultsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (resultsRef.current) resultsRef.current.scrollTop = 0;
  }, [search.query, search.groupId]);

  return (
    <dialog
      ref={dialogRef}
      id="product-finder"
      className={styles.dialog}
      aria-labelledby="product-finder-heading"
      onClose={onClosed}
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
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
        <FinderServiceLinks
          services={services}
          directions={directions}
          label={copy.finder.shortcuts}
          onNavigate={onSelect}
          onDismiss={onDismiss}
          currentPath={currentPath}
        />
        <FinderSearch
          query={search.query}
          count={search.count}
          copy={copy.finder}
          onChange={search.setQuery}
          onSubmit={() =>
            resultsRef.current
              ?.querySelector<HTMLElement>("a, [tabindex='-1']")
              ?.focus({ preventScroll: true })
          }
        />
        <FinderCategories
          groups={groups}
          selected={search.groupId}
          copy={copy.finder}
          onSelect={search.setGroupId}
        />
        <div className={styles.scroll} ref={resultsRef}>
          {search.count === 0 && (
            <div className={styles.empty}>
              <p tabIndex={-1} className="short-copy">{copy.finder.empty}</p>
              <button
                type="button"
                onClick={() => {
                  search.clear();
                  search.setGroupId(undefined);
                  dialogRef.current
                    ?.querySelector<HTMLInputElement>("#product-search")
                    ?.focus({ preventScroll: true });
                }}
              >
                {copy.hero.browse}
              </button>
            </div>
          )}
          <ProductResults
            groups={search.results}
            currentProductId={currentProductId}
            openingLabel={copy.finder.opening}
            onSelect={onSelect}
            onDismiss={onDismiss}
          />
        </div>
        <div className={styles.contact}>
          <ContactActionView action={contact} />
        </div>
      </div>
    </dialog>
  );
}
