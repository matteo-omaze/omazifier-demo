import { defineMarketApp, block, bind, env } from "omazifier";

// UK market app. NO display strings live here — every block string comes from the translation
// service by id. Multi-page: "/" is the landing hero (which links to the other routes); each other
// route renders just its block(s). Identical to de.ts except market metadata/wiring and the
// /entry block (the genuine regulatory split): UK uses `open-entry` (free postal, Prize Competitions Act).
const NAV = [
  { to: "/offers", labelId: "nav.offers" },
  { to: "/draws", labelId: "nav.draws" },
  { to: "/faq", labelId: "nav.faq" },
  { to: "/entry", labelId: "nav.entry" },
];

export default defineMarketApp({
  version: 1,
  market: { id: "uk", locale: "en-GB", currency: "GBP", timezone: "Europe/London" },
  wiring: {
    bffUrl: env("BFF_URL"),
    appData: { translations: bind.translations() },
  },
  pages: [
    {
      path: "/",
      blocks: [
        block("hero", { variant: "campaign", links: NAV }),
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
        block("draw-select", {}),
      ],
    },
    {
      path: "/draws/confirm",
      blocks: [
        block("draw-confirm", {}),
      ],
    },
    {
      path: "/draws/success",
      blocks: [
        block("draw-success", {}),
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
        block("open-entry", {}),
      ],
    },
  ],
});
