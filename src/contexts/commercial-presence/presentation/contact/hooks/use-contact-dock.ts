"use client";

import { useEffect, useState } from "react";
import { sectionIds } from "../../navigation/section-links";

export function useContactDock(): boolean {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const hero = document.getElementById(sectionIds.hero);
    const footer = document.getElementById(sectionIds.visit);
    if (!hero || !footer) return;
    let heroPassed = false;
    let footerVisible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === hero)
            heroPassed =
              !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
          if (entry.target === footer) footerVisible = entry.isIntersecting;
        }
        setVisible(heroPassed && !footerVisible);
      },
      { threshold: 0 },
    );
    observer.observe(hero);
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);
  return visible;
}
