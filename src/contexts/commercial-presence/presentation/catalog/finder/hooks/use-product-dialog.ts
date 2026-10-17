"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

export function useProductDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  function show(event: MouseEvent<HTMLAnchorElement>): void {
    const dialog = dialogRef.current;
    if (
      !dialog ||
      typeof dialog.showModal !== "function" ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    )
      return;
    event.preventDefault();
    if (!dialog.open) dialog.showModal();
    setOpen(true);
  }

  function close(): void {
    dialogRef.current?.close();
  }
  function afterClose(): void {
    setOpen(false);
  }
  return { dialogRef, isOpen, show, close, afterClose };
}
