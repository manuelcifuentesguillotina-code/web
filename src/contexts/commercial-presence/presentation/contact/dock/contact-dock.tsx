"use client";

import type { ReactElement } from "react";
import type { ContactAction } from "../../../contracts";
import { ContactActionView } from "../components/contact-action";
import { useContactDock } from "../hooks/use-contact-dock";
import styles from "./contact-dock.module.css";

export function ContactDock({ action }: { readonly action: ContactAction }): ReactElement | null {
  const visible = useContactDock();
  if (!visible) return null;
  return (
    <aside className={styles.dock} aria-label="Contacto directo" data-testid="contact-dock">
      <span className={styles.caption}>{action.benefit.label}</span>
      <ContactActionView action={action} />
    </aside>
  );
}
