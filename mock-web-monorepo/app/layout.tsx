import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Omazifier demo",
  description: "Config-driven multi-market composition — pressure test",
};

// Root layout is just the document shell. The app Header/Footer chrome lives in <AppShell>
// (so it's inside the per-market translation context and rendered on every market route).
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
