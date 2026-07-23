# mock-bff-monorepo

Stand-in for `bff-monorepo`: a zero-dependency Node server that serves per-market data for the web and mobile demo apps.

## Convention-based data layout

```
data/
├─ offers/           GET /offers?market=<id>
│                    → { currency, campaigns[], offers[] }
├─ content/          GET /content/<market>/<key>
│                    → the value at that key in <market>.json
└─ translations/     GET /translations/<market>
                     → { "key": "string translation", … }

assets/              GET /assets/<filename>
                     → static files (hero images, campaign images)
```

Markets are discovered from the files present — adding a new market means dropping JSON files in each `data/` subfolder. No server code changes required.

## Offline fallback

Both demo apps wrap their binding resolver with `withOfflineFallback` (exported from omazifier), so the BFF is optional. When unreachable, apps return bundled sample data from `omazifier/src/demo-fallback.ts` and all routes remain functional.

## Run

```sh
# from omazifier-demo/
npm run dev:bff      # http://localhost:4000
```
