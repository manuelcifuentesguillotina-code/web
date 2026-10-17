import type { PriceReference } from "../../contracts";
import styles from "./price-reference-details.module.css";

export function PriceReferenceDetails({
  reference,
}: {
  readonly reference: PriceReference;
}) {
  return (
    <details className={styles.details}>
      <summary>Referencia externa · {reference.provider}</summary>
      <div>
        <p className="short-copy">{reference.scope}</p>
        <p className="short-copy">Precio final por WhatsApp.</p>
        <a
          href={reference.href}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          Ver fuente · {reference.checkedOn.split("-").reverse().join("/")}
        </a>
      </div>
    </details>
  );
}
