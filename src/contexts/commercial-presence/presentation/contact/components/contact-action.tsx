import type { ReactElement } from "react";
import type { ContactAction } from "../../../contracts";
import { CopyMessageButton } from "./copy-message-button";
import { ArrowIcon } from "../../components/icons/arrow-icon";
import { ChatIcon } from "../../components/icons/chat-icon";
import styles from "./contact-action.module.css";

interface ContactProps {
  readonly action: ContactAction;
  readonly variant?: "solid" | "ink" | "outline";
}

export function ContactActionView({ action, variant = "solid" }: ContactProps): ReactElement {
  const className = styles.action + " " + styles[variant] + " contact-link";
  const label = <span className={styles.label}><ChatIcon />{action.label}</span>;
  if (action.destination.status === "ready") {
    return <a className={className} href={action.destination.href} target="_blank" rel="noopener noreferrer">{label}<ArrowIcon /></a>;
  }
  return (
    <details className={styles.pending + " pending-contact"}>
      <summary className={className}>{label}<span aria-hidden="true">+</span></summary>
      <div className={styles.pendingBody}>
        <p className="short-copy">{action.pendingLabel}</p>
        <textarea aria-label="Mensaje para Manolo" readOnly rows={2} wrap="off" value={action.message} />
        <CopyMessageButton message={action.message} />
      </div>
    </details>
  );
}
