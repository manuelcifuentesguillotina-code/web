import type { ReactElement } from "react";
import type { ContactAction } from "../contracts";
import { CopyMessageButton } from "./copy-message-button";

export function ContactActionView({ action }: { readonly action: ContactAction }): ReactElement {
  if (action.destination.status === "ready") {
    return (
      <a className="contact-link" href={action.destination.href} target="_blank" rel="noopener noreferrer">
        {action.label}<span aria-hidden="true">↗</span>
      </a>
    );
  }
  return (
    <details className="pending-contact">
      <summary>{action.label}<span aria-hidden="true">↗</span></summary>
      <div className="pending-body">
        <p className="short-copy">{action.pendingLabel}</p>
        <textarea aria-label="Mensaje para Manolo" readOnly rows={2} wrap="off" value={action.message} />
        <CopyMessageButton message={action.message} />
      </div>
    </details>
  );
}
