import Link from "next/link";
import type { DiscoveryLink } from "../../../contracts";
import styles from "./breadcrumbs.module.css";

export function Breadcrumbs({
  items,
}: {
  readonly items: readonly DiscoveryLink[];
}) {
  return (
    <nav aria-label="Ruta de navegación" className={styles.breadcrumbs}>
      <ol>
        {items.map((item, index) => (
          <li key={item.href}>
            {index < items.length - 1 ? (
              <Link href={item.href}>{item.name}</Link>
            ) : (
              <span aria-current="page">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
