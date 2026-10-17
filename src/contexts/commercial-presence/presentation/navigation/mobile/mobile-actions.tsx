"use client";

import { useRef, type ReactElement } from "react";
import type {
  CatalogNavigationGroup,
  ContactAction,
  DiscoveryLink,
  MarketingCopy,
} from "../../../contracts";
import { ProductFinder } from "../../catalog/finder/components/product-finder";
import { useProductDialog } from "../../catalog/finder/hooks/use-product-dialog";
import { ContactActionView } from "../../contact/components/contact-action";
import { sectionHref } from "../section-links";
import { useNavigationInset } from "./use-navigation-inset";
import styles from "./mobile-actions.module.css";

interface MobileActionsProps {
  readonly groups: readonly CatalogNavigationGroup[];
  readonly copy: MarketingCopy;
  readonly contact: ContactAction;
  readonly services: readonly DiscoveryLink[];
  readonly directions: DiscoveryLink;
  readonly home: boolean;
  readonly currentProductId?: string;
  readonly currentPath: string | null;
}

export function MobileActions({
  groups,
  copy,
  contact,
  services,
  directions,
  home,
  currentProductId,
  currentPath,
}: MobileActionsProps): ReactElement {
  const dialog = useProductDialog(currentPath);
  const barRef = useRef<HTMLElement>(null);
  useNavigationInset(barRef);
  return (
    <>
      <nav ref={barRef} className={styles.bar} aria-label="Acciones móviles">
        <a
          className={styles.browse}
          href={sectionHref("catalog", home)}
          onClick={dialog.show}
          aria-haspopup="dialog"
          aria-controls="product-finder"
          aria-expanded={dialog.isOpen}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M3 3h6v6H3zm12 0h6v6h-6zM3 15h6v6H3zm12 0h6v6h-6z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          {copy.navigation.products}
        </a>
        <ContactActionView action={contact} />
      </nav>
      <ProductFinder
        dialogRef={dialog.dialogRef}
        groups={groups}
        copy={copy}
        contact={contact}
        services={services}
        directions={directions}
        currentProductId={currentProductId}
        currentPath={currentPath}
        onDismiss={dialog.close}
        onSelect={dialog.select}
        onClosed={dialog.afterClose}
      />
    </>
  );
}
