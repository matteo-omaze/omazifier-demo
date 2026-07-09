import { createServer } from "node:http";
import { readFileSync, readdirSync } from "node:fs";

// Convention-based mock BFF. Every domain is a folder under data/, every market a JSON file:
//   data/offers/<market>.json · data/content/<market>.json · data/translations/<market>.json
// Adding a market = drop those files. No code changes here — the same reason a new market app
// needs only its own composition file + translations, never a code edit.

const PORT = Number(process.env.PORT ?? 4000);
const DATA = new URL("./data/", import.meta.url);

const isMarket = (m) => /^[a-z]{2,3}$/.test(m);

function readData(domain, market) {
  if (!isMarket(market)) return null; // guard against path traversal
  try {
    return JSON.parse(readFileSync(new URL(`${domain}/${market}.json`, DATA), "utf8"));
  } catch {
    return null;
  }
}

const knownMarkets = () => {
  try {
    return readdirSync(new URL("offers/", DATA))
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(/\.json$/, ""));
  } catch {
    return [];
  }
};

const server = createServer((req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const send = (status, body) => {
    res.statusCode = status;
    res.end(JSON.stringify(body));
  };

  if (url.pathname === "/health") return send(200, { status: "ok", markets: knownMarkets() });

  // GET /offers?market=uk -> the market's offers payload.
  if (url.pathname === "/offers") {
    const market = url.searchParams.get("market") ?? "uk";
    const payload = readData("offers", market);
    return payload ? send(200, payload) : send(404, { error: `No offers for market "${market}"` });
  }

  // GET /translations/:market -> the market's { id: string } bundle.
  const t = url.pathname.match(/^\/translations\/([^/]+)$/);
  if (t) {
    const bundle = readData("translations", t[1]);
    return bundle ? send(200, bundle) : send(404, { error: `No translations for market "${t[1]}"` });
  }

  // GET /content/:market/:key -> runtime content (stands in for Sanity), e.g. FAQ items.
  const c = url.pathname.match(/^\/content\/([^/]+)\/([^/]+)$/);
  if (c) {
    const [, market, key] = c;
    const doc = readData("content", market);
    const value = doc?.[key];
    return value === undefined
      ? send(404, { error: `No content "${key}" for market "${market}"` })
      : send(200, value);
  }

  send(404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`[mock-bff] listening on http://localhost:${PORT}  ·  markets: ${knownMarkets().join(", ")}`);
});
