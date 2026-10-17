"use client";

import type { ReactElement, ReactNode } from "react";
import { usePointerTilt } from "../hooks/use-pointer-tilt";
import styles from "./tilt-surface.module.css";

export function TiltSurface({
  children,
}: {
  readonly children: ReactNode;
}): ReactElement {
  const { ref, move, reset } = usePointerTilt();
  return (
    <div
      className={styles.surface}
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
    </div>
  );
}
