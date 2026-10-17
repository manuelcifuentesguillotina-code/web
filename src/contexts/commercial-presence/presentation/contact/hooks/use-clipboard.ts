"use client";

import { useState } from "react";

interface ClipboardState { readonly status: string; copy(message: string): Promise<void> }

export function useClipboard(): ClipboardState {
  const [status, setStatus] = useState("");
  async function copy(message: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(message);
      setStatus("Mensaje copiado.");
    } catch {
      setStatus("Selecciona y copia el mensaje.");
    }
  }
  return { status, copy };
}
