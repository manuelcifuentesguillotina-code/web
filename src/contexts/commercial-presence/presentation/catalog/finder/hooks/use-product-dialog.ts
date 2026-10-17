"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import {
  enterFinderHistory,
  isFinderEntry,
  releaseFinderHistory,
} from "../lib/finder-history";
import { usePageScrollLock } from "./use-page-scroll-lock";
import { useDialogViewport } from "./use-dialog-viewport";

export function useProductDialog(currentPath: string | null) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const navigatingRef = useRef(false);
  const [isOpen, setOpen] = useState(false);
  const { lock, unlock } = usePageScrollLock();
  useDialogViewport(dialogRef, isOpen);

  const openDialog = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    navigatingRef.current = false;
    lock();
    dialog.showModal();
    setOpen(true);
  }, [lock]);

  const closeDialog = useCallback(() => {
    unlock();
    dialogRef.current?.close();
    setOpen(false);
  }, [unlock]);

  useEffect(() => {
    const onHistory = () => (isFinderEntry() ? openDialog() : closeDialog());
    window.addEventListener("popstate", onHistory);
    return () => window.removeEventListener("popstate", onHistory);
  }, [openDialog, closeDialog]);

  useEffect(() => {
    releaseFinderHistory();
    unlock();
    dialogRef.current?.close();
  }, [currentPath, unlock]);

  function show(event: MouseEvent<HTMLAnchorElement>): void {
    if (
      !dialogRef.current ||
      typeof dialogRef.current.showModal !== "function" ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    )
      return;
    event.preventDefault();
    triggerRef.current = event.currentTarget;
    if (!dialogRef.current.open) {
      enterFinderHistory();
      openDialog();
    }
  }

  function close(): void {
    const ownsEntry = isFinderEntry();
    closeDialog();
    if (ownsEntry) window.history.back();
  }

  function select(): void {
    navigatingRef.current = true;
    releaseFinderHistory();
    // Keep loading feedback visible and restore scrolling before navigation.
    unlock();
  }

  function afterClose(): void {
    unlock();
    setOpen(false);
    if (!navigatingRef.current && triggerRef.current?.getClientRects().length)
      triggerRef.current.focus({ preventScroll: true });
  }

  return { dialogRef, isOpen, show, close, select, afterClose };
}
