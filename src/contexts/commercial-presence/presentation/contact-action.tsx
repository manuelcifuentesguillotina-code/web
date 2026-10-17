import type { ReactElement } from "react";
import type { ContactAction } from "../contracts";
import { CopyMessageButton } from "./copy-message-button";

function ContactArrow(): ReactElement {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M4 12 12 4M4 4h8v8" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ContactActionView({ action }: { readonly action: ContactAction }): ReactElement {
  if (action.destination.status === "ready") {
    return (
      <a className="contact-link" href={action.destination.href} target="_blank" rel="noopener noreferrer">
        {action.label}<ContactArrow />
      </a>
    );
  }
  return (
    <details className="pending-contact">
      <summary>{action.label}<span aria-hidden="true">+</span></summary>
      <div className="pending-body">
        <p className="short-copy">{action.pendingLabel}</p>
        <textarea aria-label="Mensaje para Manolo" readOnly rows={2} wrap="off" value={action.message} />
        <CopyMessageButton message={action.message} />
      </div>
    </details>
  );
}
