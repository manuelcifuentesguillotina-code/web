import type { ReactNode } from "react";
import "./globals.css";

export const ensureStatic = "navigation";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-CL">
      <body>{children}</body>
    </html>
  );
}
