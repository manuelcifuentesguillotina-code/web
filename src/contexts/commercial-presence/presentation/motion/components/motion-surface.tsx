"use client";

import type { ReactElement, ReactNode } from "react";
import { useEntranceReveal } from "../hooks/use-entrance-reveal";

export function MotionSurface({ children }: { readonly children: ReactNode }): ReactElement {
  const ref = useEntranceReveal();
  return <div ref={ref}>{children}</div>;
}
