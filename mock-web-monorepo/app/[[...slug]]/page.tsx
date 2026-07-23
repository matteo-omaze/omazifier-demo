import { createElement, Suspense, type ReactNode } from "react";
import { notFound } from "next/navigation";
import { composePage, renderBlocks, marketRoutes, CompositionError, withOfflineFallback, defaultResolveBinding } from "omazifier";
import app from "active-market";
import { registry } from "active-registry";
import { AppShell } from "@/components/AppShell";
import type { TranslationBundle } from "@/contexts/i18n";

export const dynamic = "force-dynamic";

// Catch-all mount point for THIS market's app (the build is scoped to one market — see next.config).
// The whole app is rooted at "/"; the URL path selects the composition PAGE:
//   /              → path "/"              → the landing hero
//   /offers        → path "/offers"        → the offer grid
//   /draws/confirm → path "/draws/confirm" → the confirm step
// composePage resolves just that page's blocks; renderBlocks + AppShell render them.
export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const path = "/" + (slug ?? []).join("/");
  if (!marketRoutes(app, registry).includes(path)) notFound();

  try {
    // Use the offline fallback so the demo works without a live BFF (Lambda can't reach localhost).
    const { page, appData } = await composePage({ app, path, registry, resolveBinding: withOfflineFallback(defaultResolveBinding) });
    return (
      <main className={`market market--${app.market.id}`}>
        <AppShell market={app.market.id} translations={appData.translations as TranslationBundle}>
          <Suspense fallback={null}>
            {renderBlocks(page.blocks, createElement, app.market) as ReactNode[]}
          </Suspense>
        </AppShell>
      </main>
    );
  } catch (err) {
    const issues = err instanceof CompositionError ? err.issues : [{ path: "", message: String(err) }];
    return (
      <main className="error">
        <h1>Invalid composition for “{app.market.id}”</h1>
        <pre>{JSON.stringify(issues, null, 2)}</pre>
      </main>
    );
  }
}
