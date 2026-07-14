import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Omazifier demo",
  description: "Config-driven multi-market composition — pressure test",
  themeColor: "#081F28",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
