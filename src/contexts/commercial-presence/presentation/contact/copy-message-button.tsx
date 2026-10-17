"use client";

import { useState, type ReactElement } from "react";

export function CopyMessageButton({ message }: { readonly message: string }): ReactElement {
  const [status, setStatus] = useState("");
  async function copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(message);
      setStatus("Mensaje copiado.");
    } catch {
      setStatus("Selecciona y copia el mensaje.");
    }
  }
  return (
    <>
      <button type="button" className="copy-button" onClick={copy}>Copiar mensaje</button>
      <span role="status" className="copy-status">{status}</span>
    </>
  );
}
