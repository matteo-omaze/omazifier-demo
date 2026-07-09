import { createContext, useContext, type ReactNode } from "react";

// APP-OWNED translation, end to end (React Native). Same role as the web app's, without a "use client"
// directive. omazifier owns none of this; blocks consume useTranslation() provided by the app shell.
export type TranslationBundle = Record<string, string>;

function translate(bundle: TranslationBundle, id: string, vars?: Record<string, string | number>): string {
  const template = bundle[id];
  if (template == null) return id;
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (token, key) => (key in vars ? String(vars[key]) : token));
}

const TranslationContext = createContext<TranslationBundle | null>(null);

export function TranslationProvider({
  bundle,
  children,
}: {
  bundle: TranslationBundle;
  children: ReactNode;
}) {
  return <TranslationContext.Provider value={bundle}>{children}</TranslationContext.Provider>;
}

export function useTranslation() {
  const bundle = useContext(TranslationContext);
  if (!bundle) throw new Error("useTranslation must be used within the app's <TranslationProvider>");
  return {
    t: (id: string, vars?: Record<string, string | number>) => translate(bundle, id, vars),
  };
}
