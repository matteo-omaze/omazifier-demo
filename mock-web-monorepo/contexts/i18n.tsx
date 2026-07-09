"use client";
import { createContext, useContext, type ReactNode } from "react";

// APP-OWNED translation, end to end. omazifier has nothing to do with translation — this app owns
// the bundle type, the id lookup + interpolation, and the context. Blocks consume useTranslation().
export type TranslationBundle = Record<string, string>;

function translate(bundle: TranslationBundle, id: string, vars?: Record<string, string | number>): string {
  const template = bundle[id];
  if (template == null) return id; // missing id → visible + debuggable
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
