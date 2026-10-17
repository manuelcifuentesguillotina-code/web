import type { ReactNode } from "react";
import type { Viewport } from "next";
import "./globals.css";
import { bodyFont, displayFont } from "./fonts";

export const ensureStatic = "navigation";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es-CL"
      className={bodyFont.variable + " " + displayFont.variable}
    >
      <body>{children}</body>
    </html>
  );
}
