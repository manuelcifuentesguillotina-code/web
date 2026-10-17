"use client";

import type { ReactElement, ReactNode } from "react";
import { usePointerTilt } from "../hooks/use-pointer-tilt";
import styles from "./tilt-surface.module.css";

export function TiltSurface({ children }: { readonly children: ReactNode }): ReactElement {
  const tilt = usePointerTilt();
  return <div className={styles.surface} ref={tilt.ref} onPointerMove={tilt.move} onPointerLeave={tilt.reset}>{children}</div>;
}
