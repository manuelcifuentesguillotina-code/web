import type { ReactElement } from "react";
import type { ContactAction } from "../../../contracts";
import { CopyMessageButton } from "./copy-message-button";
import { ArrowIcon } from "../../components/icons/arrow-icon";
import { ChatIcon } from "../../components/icons/chat-icon";
import styles from "./contact-action.module.css";

interface ContactProps {
  readonly compact?: boolean;
  readonly subject?: string;
  readonly action: ContactAction;
  readonly variant?: "solid" | "ink" | "outline";
}

export function ContactActionView({
  action,
  variant = "solid",
  compact = false,
  subject,
}: ContactProps): ReactElement {
  const className =
    styles.action +
    " " +
    styles[variant] +
    (compact ? " " + styles.compact : "") +
    " contact-link";
  const label = (
    <span className={styles.label}>
      <ChatIcon />
      <span className={compact ? "sr-only" : undefined}>{action.label}</span>
    </span>
  );
  if (action.destination.status === "ready") {
    return (
      <a
        className={className}
        href={action.destination.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={
          subject ? action.label + " · " + subject + " · WhatsApp" : undefined
        }
      >
        {label}
        {!compact && <ArrowIcon />}
      </a>
    );
  }
  return (
    <details className={styles.pending + " pending-contact"}>
      <summary
        className={className}
        aria-label={subject ? action.label + " · " + subject : undefined}
      >
        {label}
        <span aria-hidden="true">+</span>
      </summary>
      <div className={styles.pendingBody}>
        <p className="short-copy">{action.pendingLabel}</p>
        <textarea
          aria-label="Mensaje para Manolo"
          readOnly
          rows={2}
          wrap="off"
          value={action.message}
        />
        <CopyMessageButton message={action.message} />
      </div>
    </details>
  );
}
