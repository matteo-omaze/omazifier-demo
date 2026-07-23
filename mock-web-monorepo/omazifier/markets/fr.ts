import { defineMarketApp, block, bind, env } from "omazifier";

// FR market app. NO display strings live here — every block string comes from the FR translation
// bundle by id. Identical to uk.ts except market metadata/wiring: France uses `open-entry`
// (free postal route, like UK) — no KYC requirement under French prize-draw law.
const NAV = [
  { to: "/offers", labelId: "nav.offers" },
  { to: "/draws", labelId: "nav.draws" },
  { to: "/faq", labelId: "nav.faq" },
  { to: "/entry", labelId: "nav.entry" },
];

export default defineMarketApp({
  version: 1,
  market: { id: "fr", locale: "fr-FR", currency: "EUR", timezone: "Europe/Paris" },
  wiring: {
    bffUrl: env("BFF_URL"),
    appData: { translations: bind.translations() },
  },
  pages: [
    {
      path: "/",
      blocks: [
        block("hero", { links: NAV, imageUrl: "http://localhost:4000/assets/Loire.webp", primaryCtaLabelId: "nav.draws" }),
      ],
    },
    {
      path: "/offers",
      blocks: [
        block("offer-grid", { columns: 3 }, { offers: bind.bff("offers") }),
      ],
    },
    {
      path: "/draws",
      blocks: [
        block("draw/select", {}, { offers: bind.bff("offers") }),
      ],
    },
    {
      path: "/faq",
      blocks: [
        block("faq", {}, { items: bind.sanity("offersFaq") }),
        block("terms", {}),
      ],
    },
    {
      path: "/entry",
      blocks: [
        block("open-entry", {}),
      ],
    },
  ],
});
