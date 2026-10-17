"use client";

import { useEffect, type RefObject } from "react";

export function useNavigationInset(ref: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const bar = ref.current;
    if (!bar || !("ResizeObserver" in window)) return;
    const root = document.documentElement;
    const previous = root.style.getPropertyValue("--mobile-navigation-space");
    const update = () =>
      root.style.setProperty(
        "--mobile-navigation-space",
        Math.ceil(bar.getBoundingClientRect().height) + "px",
      );
    const observer = new ResizeObserver(update);
    update();
    observer.observe(bar);
    return () => {
      observer.disconnect();
      if (previous)
        root.style.setProperty("--mobile-navigation-space", previous);
      else root.style.removeProperty("--mobile-navigation-space");
    };
  }, [ref]);
}
