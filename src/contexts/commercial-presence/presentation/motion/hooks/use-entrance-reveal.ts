"use client";

import { useEffect, useRef, type RefObject } from "react";

export function useEntranceReveal(): RefObject<HTMLDivElement | null> {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      !root.current ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)")
        .matches
    )
      return;
    const elements =
      root.current.querySelectorAll<HTMLElement>("[data-entrance]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || !(entry.target instanceof HTMLElement))
            continue;
          entry.target.dataset.reveal = "visible";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.06 },
    );
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight) return;
      element.dataset.reveal = "pending";
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => {
        delete element.dataset.reveal;
      });
    };
  }, []);
  return root;
}
