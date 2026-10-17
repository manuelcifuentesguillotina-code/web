import Link from "next/link";
import type { DiscoveryLink } from "../../../contracts";
import styles from "./discovery-links.module.css";

export function DiscoveryLinks({
  links,
}: {
  readonly links: readonly DiscoveryLink[];
}) {
  return (
    <nav aria-label="Impresión, corte y proyectos" className={styles.links}>
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
