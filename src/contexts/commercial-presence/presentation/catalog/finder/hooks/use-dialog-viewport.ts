"use client";

import { useEffect, type RefObject } from "react";

export function useDialogViewport(
  ref: RefObject<HTMLDialogElement | null>,
  isOpen: boolean,
): void {
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !isOpen) return;
    const viewport = window.visualViewport;
    let frame = 0;
    function update() {
      if (!dialog) return;
      const height = viewport?.height ?? window.innerHeight;
      const bottom = Math.max(
        0,
        window.innerHeight - height - (viewport?.offsetTop ?? 0),
      );
      dialog.style.setProperty("--finder-viewport-height", height + "px");
      dialog.style.setProperty("--finder-viewport-bottom", bottom + "px");
      dialog.toggleAttribute("data-compact-viewport", height < 500);
    }
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    viewport?.addEventListener("resize", schedule);
    viewport?.addEventListener("scroll", schedule);
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      viewport?.removeEventListener("resize", schedule);
      viewport?.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      dialog.style.removeProperty("--finder-viewport-height");
      dialog.style.removeProperty("--finder-viewport-bottom");
      dialog.removeAttribute("data-compact-viewport");
    };
  }, [ref, isOpen]);
}
