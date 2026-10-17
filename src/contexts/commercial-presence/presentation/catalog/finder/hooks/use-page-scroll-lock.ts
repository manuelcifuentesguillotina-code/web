"use client";

import { useCallback, useEffect, useRef } from "react";

export function usePageScrollLock() {
  const release = useRef<(() => void) | undefined>(undefined);
  const unlock = useCallback(() => {
    release.current?.();
    release.current = undefined;
  }, []);
  const lock = useCallback(() => {
    if (release.current) return;
    const { style } = document.body;
    const previous = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      left: style.left,
      width: style.width,
    };
    const x = window.scrollX;
    const y = window.scrollY;
    Object.assign(style, {
      overflow: "hidden",
      position: "fixed",
      top: -y + "px",
      left: -x + "px",
      width: "100%",
    });
    release.current = () => {
      Object.assign(style, previous);
      window.scrollTo({ left: x, top: y, behavior: "instant" });
    };
  }, []);
  useEffect(() => unlock, [unlock]);
  return { lock, unlock };
}
