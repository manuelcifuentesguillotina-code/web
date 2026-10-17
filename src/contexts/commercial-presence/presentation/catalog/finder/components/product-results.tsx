import Link from "next/link";
import type { ReactElement } from "react";
import type { CatalogNavigationGroup } from "../../../../contracts";
import { ArrowIcon } from "../../../components/icons/arrow-icon";
import styles from "./product-finder.module.css";

interface ProductResultsProps {
  readonly groups: readonly CatalogNavigationGroup[];
  readonly currentProductId?: string;
  readonly onSelect: () => void;
}

export function ProductResults({
  groups,
  currentProductId,
  onSelect,
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
                  href={item.href}
                  onClick={onSelect}
                  aria-current={
                    item.id === currentProductId ? "page" : undefined
                  }
                >
                  {item.name}
                  <ArrowIcon diagonal={false} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
