import type { ReactNode } from "react";
import "./globals.css";
import { bodyFont, displayFont } from "./fonts";

export const ensureStatic = "navigation";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-CL" className={bodyFont.variable + " " + displayFont.variable}>
      <body>{children}</body>
    </html>
  );
}
