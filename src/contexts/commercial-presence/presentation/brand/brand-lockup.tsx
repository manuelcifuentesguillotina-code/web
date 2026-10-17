import Link from "next/link";
import type { ReactElement } from "react";
import type { CompanyView } from "../../contracts";
import { CommercialMedia } from "../components/media/commercial-media";
import styles from "./brand-lockup.module.css";

export function BrandLockup({
  company,
}: {
  readonly company: CompanyView;
}): ReactElement {
  const [name, ...rest] = company.name.split(" ");
  return (
    <Link
      href="/"
      className={styles.brand}
      aria-label={company.name + " · inicio"}
    >
      <span className={styles.mark}>
        <CommercialMedia media={company.logo} sizes="48px" />
      </span>
      <span className={styles.name}>
        <strong>{name}</strong>
        <span>{rest.join(" ")}</span>
      </span>
    </Link>
  );
}
