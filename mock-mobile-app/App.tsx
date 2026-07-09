import { createElement, useEffect, useState, type ReactNode } from "react";
import { SafeAreaView, ScrollView, Text, StyleSheet, StatusBar } from "react-native";
import { composePage, renderBlocks, marketRoutes, defaultResolveBinding, withOfflineFallback, type ResolvedBlock } from "omazifier";
import type { TranslationBundle } from "./contexts/i18n";
import { NavContext } from "./contexts/nav";
import app from "active-market";
import { registry } from "./omazifier/registry";
import { AppShell } from "./components/AppShell";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

// The mount point + in-app router for THIS market's app (the bundle is scoped to one market — see
// metro.config.js / MARKET). App owns { path, params }; navigate() re-composes. composePage(path)
// resolves just the current route's blocks. (Production mobile would use expo-router screens; the
// demo simulates it with state — see contexts/nav.tsx.)
export default function App() {
  const [nav, setNav] = useState<{ path: string; params: Record<string, string> }>({ path: "/", params: {} });
  const [blocks, setBlocks] = useState<ResolvedBlock[]>([]);
  const [translations, setTranslations] = useState<TranslationBundle | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = (path: string, params: Record<string, string> = {}) => setNav({ path, params });

  useEffect(() => {
    let active = true;
    (async () => {
      setError(null);
      if (!marketRoutes(app).includes(nav.path)) {
        if (active) setError(`No route "${nav.path}"`);
        return;
      }
      try {
        const { page, appData } = await composePage({
          app,
          path: nav.path,
          registry,
          // omazifier's default resolver, wrapped with the DEMO-ONLY offline fallback.
          resolveBinding: withOfflineFallback(defaultResolveBinding),
        });
        if (active) {
          setBlocks(page.blocks);
          setTranslations(appData.translations as TranslationBundle);
        }
      } catch (err: any) {
        if (active) setError(err?.message ?? String(err));
      }
    })();
    return () => {
      active = false;
    };
  }, [nav.path]);

  return (
    <NavContext.Provider value={{ path: nav.path, params: nav.params, navigate }}>
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" />
        <Header market={app.market.id} onHome={() => navigate("/")} />
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.badge}>
            market: {app.market.id} · {app.market.locale} · {app.market.currency} · {nav.path}
          </Text>
          {error ? (
            <Text style={styles.error}>{error}</Text>
          ) : translations ? (
            <AppShell translations={translations}>
              {renderBlocks(blocks, createElement, app.market) as ReactNode[]}
              <Footer />
            </AppShell>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </NavContext.Provider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f6f7fb" },
  scroll: { padding: 16 },
  badge: { color: "#6b7280", fontSize: 13, marginBottom: 12 },
  error: { color: "#b00020", fontFamily: "Courier", fontSize: 12 },
});
