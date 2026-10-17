"use client";

import type { ReactElement, ReactNode } from "react";
import { usePointerTilt } from "../hooks/use-pointer-tilt";
import styles from "./tilt-surface.module.css";

export function TiltSurface({
  children,
  variant = "default",
}: {
  readonly children: ReactNode;
  readonly variant?: "default" | "showcase";
}): ReactElement {
  const { ref, move, reset } = usePointerTilt();
  return (
    <div
      className={
        variant === "showcase"
          ? `${styles.surface} ${styles.showcase}`
          : styles.surface
      }
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
    </div>
  );
}
