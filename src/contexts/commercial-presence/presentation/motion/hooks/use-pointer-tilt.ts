"use client";

import { useEffect, useRef, type PointerEvent, type RefObject } from "react";
import { normalizedPointer } from "../lib/pointer-position";

interface PointerTilt {
  readonly ref: RefObject<HTMLDivElement | null>;
  move(event: PointerEvent<HTMLDivElement>): void;
  reset(): void;
}

export function usePointerTilt(): PointerTilt {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  function move(event: PointerEvent<HTMLDivElement>): void {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointer = normalizedPointer(event.clientX - bounds.left, event.clientY - bounds.top, bounds.width, bounds.height);
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      ref.current?.style.setProperty("--tilt-x", String(pointer.x));
      ref.current?.style.setProperty("--tilt-y", String(pointer.y));
    });
  }
  function reset(): void {
    cancelAnimationFrame(frame.current);
    ref.current?.style.setProperty("--tilt-x", "0");
    ref.current?.style.setProperty("--tilt-y", "0");
  }
  return { ref, move, reset };
}
