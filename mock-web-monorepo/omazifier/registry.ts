import { defineRegistry } from "omazifier";
import { heroConfig } from "@/blocks/hero.schema";
import { offerGridConfig } from "@/blocks/offer-grid.schema";
import { faqConfig } from "@/blocks/faq.schema";
import { drawSelectConfig } from "@/blocks/draw/select.schema";
import { drawConfirmConfig } from "@/blocks/draw/confirm.schema";
import { drawSuccessConfig } from "@/blocks/draw/success.schema";
import { termsConfig } from "@/blocks/terms.schema";
import { charityAdConfig } from "@/blocks/charity-ad.schema";
import { openEntryConfig } from "@/blocks/entry/open.schema";
import { verifiedEntryConfig } from "@/blocks/entry/verified.schema";
import { Hero } from "@/blocks/hero";
import { OfferGrid } from "@/blocks/offer-grid";
import { Faq } from "@/blocks/faq";
import { DrawSelect } from "@/blocks/draw/select";
import { DrawConfirm } from "@/blocks/draw/confirm";
import { DrawSuccess } from "@/blocks/draw/success";
import { Terms } from "@/blocks/terms";
import { CharityAd } from "@/blocks/charity-ad";
import { OpenEntry } from "@/blocks/entry/open";
import { VerifiedEntry } from "@/blocks/entry/verified";

// The app's contract with omazifier: the set of blocks (id → config schema + component) this app
// makes available — the shared component library every market build depends on. Runs on the server,
// so pairing schemas with "use client" component references here is what makes registration work
// across the RSC boundary. The active market's composition file is resolved separately (see the
// `active-market` alias in next.config.mjs), so this file carries no per-market knowledge.
export const registry = defineRegistry([
  { id: "hero", configSchema: heroConfig, component: Hero as any },
  { id: "offer-grid", configSchema: offerGridConfig, component: OfferGrid as any },
  {
    id: "draw/select",
    configSchema: drawSelectConfig,
    component: DrawSelect as any,
    requires: [
      { blockId: "draw/confirm", subPath: "/confirm" },
      { blockId: "draw/success", subPath: "/success" },
    ],
  },
  { id: "draw/confirm", configSchema: drawConfirmConfig, component: DrawConfirm as any, private: true },
  { id: "draw/success", configSchema: drawSuccessConfig, component: DrawSuccess as any, private: true },
  { id: "faq", configSchema: faqConfig, component: Faq as any },
  { id: "terms", configSchema: termsConfig, component: Terms as any },
  { id: "charity-ad", configSchema: charityAdConfig, component: CharityAd as any },
  { id: "open-entry", configSchema: openEntryConfig, component: OpenEntry as any },
  { id: "verified-entry", configSchema: verifiedEntryConfig, component: VerifiedEntry as any },
]);
