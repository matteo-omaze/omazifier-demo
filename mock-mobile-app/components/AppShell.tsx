import type { ReactNode } from "react";
import { TranslationProvider, type TranslationBundle } from "../contexts/i18n";

// APP-OWNED shell (React Native). Provides the app's translation context around whatever omazifier
// resolved. Chrome (header, market toggle) lives in App.tsx.
export function AppShell({
  translations,
  children,
}: {
  translations: TranslationBundle;
  children: ReactNode;
}) {
  return <TranslationProvider bundle={translations}>{children}</TranslationProvider>;
}
