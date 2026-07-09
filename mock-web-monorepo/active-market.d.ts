// Type for the market-agnostic `active-market` import. The concrete file is resolved at build time
// by a webpack alias keyed on MARKET (see next.config.mjs); this just gives it a type. Every market
// composition has the same shape, so one ambient declaration covers them all.
declare module "active-market" {
  import type { MarketApp } from "omazifier";
  const app: MarketApp;
  export default app;
}
