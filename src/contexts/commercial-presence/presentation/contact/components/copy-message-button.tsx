"use client";

import type { ReactElement } from "react";
import { useClipboard } from "../hooks/use-clipboard";
import styles from "./contact-action.module.css";

export function CopyMessageButton({ message }: { readonly message: string }): ReactElement {
  const clipboard = useClipboard();
  return <>
    <button type="button" className={styles.copyButton} onClick={() => clipboard.copy(message)}>Copiar mensaje</button>
    <span role="status" className={styles.copyStatus}>{clipboard.status}</span>
  </>;
}
