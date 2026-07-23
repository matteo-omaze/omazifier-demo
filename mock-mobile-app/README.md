# mock-mobile-app

Stand-in for `mobile-app`: an Expo/React Native app that composes per-market pages using omazifier — the same engine and the same composition schema as the web build. One market per Metro bundle.

## How omazifier is plumbed in

```
MARKET=uk npx expo start
  │
  ├─ metro.config.js resolves module alias:
  │     "active-market"  →  omazifier/markets/uk.ts
  │
  └─ App.tsx (root component)
       │
       ├─ import app from "active-market"              ← the uk MarketApp
       ├─ import { registry } from "./omazifier/registry"  ← RN block registry
       │
       └─ on each navigation:
            composePage({ app, path, registry, resolveBinding: withOfflineFallback(defaultResolveBinding) })
              ├─ validates composition + expands `requires` (auto-mounts /draws/confirm, /draws/success)
              ├─ resolves BFF / Sanity / translation bindings
              │   └─ withOfflineFallback: on fetch error → returns bundled sample data from omazifier
              └─ returns page.blocks + appData.translations
                   │
                   └─ renderBlocks(page.blocks, createElement, app.market)
                        │
                        └─ <AppShell translations={...}>   (components/AppShell.tsx)
                             └─ I18nProvider → useTranslation() / t(id) in every block
```

### AppShell (`components/AppShell.tsx`)

Provides `I18nProvider` with the market's translation bundle. Identical in purpose to the web version; uses RN `View`/`Text` instead of DOM elements. Blocks call `useTranslation()` for all display strings — no strings are hardcoded in block components.

### Navigation (`contexts/nav.tsx`)

`App.tsx` manages `{ path, params }` state and exposes a `navigate(path, params?)` function via `NavContext`. Any block can call `navigate("/draws")` to trigger recomposition for that route. `marketRoutes()` from omazifier guards against unknown paths. Production mobile would use expo-router screens; the demo simulates routing with component state.

### Offline fallback

`withOfflineFallback` is a demo-only export from omazifier. When the mock-bff server is unreachable (no local server, device testing, CI), all data bindings — offers, translations, FAQ content — return bundled sample data. The full draw flow and all routes work without a running server.

## The `omazifier/` folder

```
omazifier/
├─ markets/
│   ├─ uk.ts    ← parallel to the web market file (same composition schema; shared package in real monorepo)
│   ├─ de.ts
│   └─ fr.ts
└─ registry.ts  ← maps block ids ("hero", "draw/select", …) to React Native components
```

The market files are structurally identical to their web counterparts. The only difference is the registry: web maps to DOM components, mobile maps to RN components. The engine and composition pipeline are the same.

## Run locally

```sh
# From omazifier-demo/
npm install
cd ../omazifier && npm run build   # build the engine first

# Terminal 1 — mock BFF (optional; all routes work offline via withOfflineFallback)
npm run dev:bff                    # http://localhost:4000

# Terminal 2 — pick a market
npm run dev:mobile:uk              # Metro on :8081, opens iOS Simulator
npm run dev:mobile:de              # Metro on :8082, separate simulator
npm run dev:mobile:fr              # Metro on :8083
```

Each script keeps a Metro dev server alive with hot reload. Three markets can run simultaneously — each claims its own simulator. `jsEngine: "jsc"` in `app.json` keeps bundling reproducible across machines; Hermes works fine on a normally-aligned Expo toolchain.
