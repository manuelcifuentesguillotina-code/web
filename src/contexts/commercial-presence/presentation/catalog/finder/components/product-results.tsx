import Link from "next/link";
import type { ReactElement } from "react";
import type { CatalogNavigationGroup } from "../../../../contracts";
import { ContactActionView } from "../../../contact/components/contact-action";
import { LinkProgress } from "./link-progress";
import styles from "./product-results.module.css";

interface ProductResultsProps {
  readonly groups: readonly CatalogNavigationGroup[];
  readonly currentProductId?: string;
  readonly openingLabel: string;
  readonly onSelect: () => void;
  readonly onDismiss: () => void;
}

export function ProductResults({
  groups,
  currentProductId,
  openingLabel,
  onSelect,
  onDismiss,
}: ProductResultsProps): ReactElement {
  return (
    <div id="product-results" className={styles.results}>
      {groups.map((group) => (
        <section key={group.id}>
          <h3 className={styles.groupName}>{group.name}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={item.id}>
                <Link
                  className={styles.productLink}
                  href={item.href}
                  aria-label={item.name}
                  aria-describedby={"finder-price-" + item.id}
                  replace
                  onNavigate={(event) => {
                    if (item.id === currentProductId) {
                      event.preventDefault();
                      onDismiss();
                    } else onSelect();
                  }}
                  aria-current={
                    item.id === currentProductId ? "page" : undefined
                  }
                >
                  <span>
                    <strong>{item.name}</strong>
                    <span
                      id={"finder-price-" + item.id}
                      className={styles.price}
                    >
                      {item.price.label}
                      {item.price.status === "approved" && (
                        <span>
                          {item.price.basis} · {item.price.taxLabel}
                        </span>
                      )}
                    </span>
                  </span>
                  <LinkProgress label={openingLabel} />
                </Link>
                <ContactActionView
                  action={item.contact}
                  compact
                  subject={item.name}
                />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
