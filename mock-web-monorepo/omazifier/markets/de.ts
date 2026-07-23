import { defineMarketApp, block, bind, env } from "omazifier";

// DE market app. NO display strings live here — every block string comes from the DE translation
// bundle by id. Identical to uk.ts except market metadata/wiring and the /entry block:
// DE uses `verified-entry` (KYC required, no postal route — Glücksspielstaatsvertrag).
const NAV = [
  { to: "/draws", labelId: "nav.draws" },
  { to: "/faq", labelId: "nav.faq" },
  { to: "/entry", labelId: "nav.entry" },
];

export default defineMarketApp({
  version: 1,
  market: { id: "de", locale: "de-DE", currency: "EUR", timezone: "Europe/Berlin" },
  wiring: {
    bffUrl: env("BFF_URL"),
    appData: { translations: bind.translations() },
  },
  pages: [
    {
      path: "/",
      blocks: [
        block("hero", { links: NAV, imageUrl: "/assets/Frankfurt.webp", primaryCtaLabelId: "nav.draws" }),
      ],
    },
    {
      path: "/offers",
      blocks: [
        block("offer-grid", { columns: 3 }, { offers: bind.bff("offers") }),
        block("charity-ad", {}),
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
        block("charity-ad", {}),
        block("terms", {}),
      ],
    },
    {
      path: "/entry",
      blocks: [
        block("verified-entry", { provider: "schufa" }),
      ],
    },
  ],
});
