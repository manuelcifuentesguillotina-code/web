import Link from "next/link";
import type { DiscoveryLink } from "../../../../contracts";
import styles from "./finder-service-links.module.css";

interface FinderServiceLinksProps {
  readonly services: readonly DiscoveryLink[];
  readonly directions: DiscoveryLink;
  readonly label: string;
  readonly onNavigate: () => void;
  readonly onDismiss: () => void;
  readonly currentPath: string | null;
}

export function FinderServiceLinks({
  services,
  directions,
  label,
  onNavigate,
  onDismiss,
  currentPath,
}: FinderServiceLinksProps) {
  return (
    <nav className={styles.quickLinks} aria-label={label}>
      {services.map((service) => (
        <Link
          key={service.href}
          href={service.href}
          replace
          onNavigate={(event) => {
            if (currentPath === service.href) {
              event.preventDefault();
              onDismiss();
            } else onNavigate();
          }}
        >
          {service.name}
        </Link>
      ))}
      <a href={directions.href} target="_blank" rel="noopener noreferrer">
        {directions.name}
      </a>
    </nav>
  );
}
