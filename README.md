# omazifier — pressure-test demo

A local, runnable showcase of the **omazifier** idea: a config-driven system that composes
**market-agnostic** blocks into **per-market apps** from a single composition file — on both web
and mobile, off the same engine and the same composition schema.

> This is a throwaway demo to pressure-test the design (see `../omazifier-design.md`). It uses
> `npm` workspaces (the real repos use `pnpm`) and a Vite-free Next.js stand-in; nothing here is
> production code.

## The story it tells

Two markets — **UK** and **DE** — are built from the **same block library**. Each market is its
**own deployable** (mirroring `offers-uk` / `offers-de` as separate Nx apps, and separate store
apps on mobile): one build = one market, rooted at `/`, as a set of **routes**:

```
/                → hero (landing) — links to the routes below
/offers          → offer-grid
/draws           → draw/select ──► /draws/confirm → draw/confirm ──► /draws/success → draw/success
/faq             → faq  +  terms (with deep-linkable experience rules)
/entry           → [ entry-route ]
```

Routing selects a **page** (a set of blocks); the app's router maps the URL path → `composePage(path)`.

- `hero`, `offer-grid`, `faq` are **one configurable block each** — identical component, different
  config + content + currency (£ vs €). This is the "very similar → one component" case.
- The `/entry` route is **THE SPLIT**: a genuine regulatory divergence that config can't bridge,
  so it's two usage-named blocks (never market-named):
  - **UK → `open-entry`** — free postal route ("No purchase necessary", Prize Competitions Act).
  - **DE → `verified-entry`** — KYC identity check (SCHUFA/PostIdent, Glücksspielstaatsvertrag);
    no postal route exists.
- The **draw flow is three routed step blocks** (`draw/select` → `draw/confirm` → `draw/success`),
  navigating by link/route with the choice carried as a query/nav param. The three blocks live under
  `blocks/draw/` and are grouped there because they only make sense together. The engine enforces
  this: `draw/select` carries a `requires` declaration, so a market config needs only one line
  (`block("draw/select", ...)` at `/draws`) — the engine auto-mounts `/draws/confirm` and
  `/draws/success` via `expandRequires`. `draw/confirm` and `draw/success` are marked `private: true`
  in the registry, so `validateComposition` rejects any market file that places them directly —
  they can only be mounted by the engine via `requires`.
- `terms` shows **deep-linkable nested content**: its nested "experience rules" has an anchor
  (`#house-draw-rules`) and the `faq` block links straight to it — without the sub-section being a
  registry entry.
- **Two kinds of reuse:** the **Header/Footer** are app *chrome* — plain app components rendered by
  the shell on every route (not omazifier blocks). The **`charity-ad`** is a reusable *block* —
  placed on both `/offers` and `/faq` in the composition, showing a block can appear on many routes.

Three markets are defined by one composition file each (`markets/uk.ts`, `markets/de.ts`,
`markets/fr.ts`) — the only per-market artifact. Swap `open-entry` for `verified-entry` in the file and the page changes; no
per-market source is generated or hand-edited. Each build is **scoped to one market**: `MARKET=uk`
resolves the market-agnostic `active-market` import to `markets/uk.ts` and nothing from another
market enters the bundle. **Adding a market is a pure file-drop** — a new `markets/<code>.ts` plus
its BFF data/translations, built with `MARKET=<code>`; no shared code is edited (see
*Two things this demonstrates* below).

**Strings are not hardcoded.** All display strings are resolved by id from the BFF
(`GET /translations/:market` → React context → `t(id)`), so `offer-grid` and `faq` carry no string
config and are now **identical** in `markets/uk.ts` and `markets/de.ts`. Market differences are
configuration, not language. See `../omazifier-translation.md` for the full write-up.

## Layout

The **engine is the product** and lives one level up, at `omazifier/`. This `demo/` folder is a
throwaway consumer of it.

```
omazifier/                 ← the engine/product (src/, dist/, package.json) — builds on its own
├─ omazifier-design.md
└─ demo/                   ← you are here: the pressure-test harness
   ├─ mock-web-monorepo/   (stands in for web-monorepo)  Next.js 15 app; DOM blocks + market files
   ├─ mock-mobile-app/     (stands in for mobile-app)    Expo/RN app; RN blocks, SAME composition
   └─ mock-bff-monorepo/   (stands in for bff-monorepo)  zero-dep Node server; per-market data by convention
```

The mocks consume the engine via a relative `file:../..` dependency. omazifier is a **thin,
framework-agnostic library** (no React, no translations, no shell, no codegen): it combines components
per market (`validateComposition → composePage → renderBlocks`) and ships a default fetch-based
binding resolver (`createBindingResolver` + `defaultResolveBinding`) that `composePage` uses when the
app passes none. Each app's omazifier surface is its **`omazifier/` folder** = `markets/` +
`registry.ts`; the build picks one market via the `active-market` import (`MARKET` → webpack alias
on web, Metro `resolveRequest` on mobile). `registry.ts` is the **shared component library** (all
blocks) and holds no per-market knowledge. The **shell** (`components/AppShell`, `Header`, `Footer`)
and the **translation/nav contexts** (`contexts/`) are app-owned. The apps don't write a data
resolver — web uses omazifier's default; mobile wraps it with `withOfflineFallback` (a DEMO-ONLY
export from the engine that serves bundled UK/DE sample data when the BFF is unreachable). See
`../omazifier-design.md` › *Consumption model*.

The mock BFF is **convention-based**: every domain is a folder under `data/`, every market a JSON
file — `data/offers/<market>.json`, `data/content/<market>.json`, `data/translations/<market>.json`.
Markets are auto-discovered from those files, so adding one needs no server code change.

## Run it

First build the engine (one level up):

```sh
cd ..                       # into omazifier/
npm install
npm run build               # compile the engine (tsc)
npm test                    # 16 engine tests, incl. "THE SPLIT" + composePage
```

Then run the demo. Each build is one market, rooted at `/` (no `/uk` `/de` URL prefix):

```sh
cd demo
npm install

# Terminal 1 — the mock BFF
npm run dev:bff             # http://localhost:4000

# Terminal 2/3/4 — one web app per market (each on its own port)
npm run dev:web:uk          # http://localhost:3005  (UK — £ offers, open-entry)
npm run dev:web:de          # http://localhost:3006  (DE — € offers, verified-entry at /entry)
npm run dev:web:fr          # http://localhost:3007  (FR — € offers, open-entry, Loire house)
```

### Mobile (Expo)

```sh
# From demo/ root — each market runs its own Metro bundler on a dedicated port
npm run dev:mobile:uk       # Metro on :8081 — claims a dedicated simulator
npm run dev:mobile:de       # Metro on :8082 — claims a separate simulator
```

Each command keeps its terminal alive as a Metro dev server (hot reload works independently per market). Simulators are claimed exclusively per market; both can run simultaneously without Xcode build conflicts.

Note: the mobile composition files are byte-identical copies of the web ones — in the real
monorepo these would be a single shared source. The app fetches from the BFF and, when it's
unreachable, falls back to bundled UK/DE sample data (the engine's DEMO-ONLY `withOfflineFallback`).
This demo sets `jsEngine: "jsc"` in `app.json` to keep bundling reproducible across machines; Hermes
is fine on a normally-aligned Expo toolchain.

## Two things this demonstrates

**1 — Rebuild only the changed market, no cross-market bloat.** Each market builds to its own output
and contains only its own composition:

```sh
cd demo/mock-web-monorepo
MARKET=uk npm run build     # → dist/uk/   (editing markets/uk.ts + this leaves dist/de/ untouched)
MARKET=de npm run build     # → dist/de/
grep -rl Europe/Berlin dist/uk   # → nothing: DE's composition never entered the UK build
```

(Mobile is the same: `MARKET=uk npm run bundle:check` → `dist/uk/`, `MARKET=de` → `dist/de/`.)

**2 — A new market is a file-drop, no code edits.** Add `omazifier/markets/<code>.ts` plus the
BFF's `data/{offers,content,translations}/<code>.json`, then build with `MARKET=<code>`. The
`active-market` alias and the convention-based BFF pick it up; no shared source changes.

## What this pressure test proved

- The composition file is **pure serialisable data** (a JSON round-trip test enforces it) — a UI
  could read/write it later without touching the engine.
- The **same schema + engine** render on **web and React Native**; only the block registry differs.
  Build-time now, but the resolve/render core is untouched by *when* the config is loaded.
- The **configurable-vs-split** rule holds against real Omaze theme divergence (UK postal entry vs
  DE KYC), and usage-naming keeps the library market-agnostic.
- Each market is an **independent build target** (`dist-<market>/`, one bundle per market): rebuilding
  one never touches another, and no market's composition leaks into another's build.
- **Adding a market takes no code edits** — a composition file plus its BFF data/translations,
  auto-discovered by convention (verified live by adding the `fr` market: Loire house, vacation
  campaign, and all draw/entry flows, with FR translations using narrow no-break spaces for currency).
- Validation catches unknown block ids and bad per-block config at build, with precise paths.
