"use client";
import type { ReactNode } from "react";
import { TranslationProvider, type TranslationBundle } from "@/contexts/i18n";
import { Header } from "./Header";
import { Footer } from "./Footer";

// APP-OWNED shell. Sets up the app's translation context + chrome (Header/Footer, reused on every
// route), then renders whatever omazifier composed for the current route as children. The Header
// and Footer are app components, NOT omazifier blocks — they're the same everywhere, so they live
// in the shell rather than in each page's composition.
export function AppShell({
  market,
  translations,
  children,
}: {
  market: string;
  translations: TranslationBundle;
  children: ReactNode;
}) {
  return (
    <TranslationProvider bundle={translations}>
      <Header market={market} />
      {children}
      <Footer />
    </TranslationProvider>
  );
}
