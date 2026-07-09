import { defineRegistry } from "omazifier";
import {
  heroConfig,
  offerGridConfig,
  faqConfig,
  drawSelectConfig,
  drawConfirmConfig,
  drawSuccessConfig,
  termsConfig,
  charityAdConfig,
  openEntryConfig,
  verifiedEntryConfig,
} from "@/blocks/schemas";
import { Hero } from "@/blocks/hero";
import { OfferGrid } from "@/blocks/offer-grid";
import { Faq } from "@/blocks/faq";
import { DrawSelect } from "@/blocks/draw-select";
import { DrawConfirm } from "@/blocks/draw-confirm";
import { DrawSuccess } from "@/blocks/draw-success";
import { Terms } from "@/blocks/terms";
import { CharityAd } from "@/blocks/charity-ad";
import { OpenEntry } from "@/blocks/open-entry";
import { VerifiedEntry } from "@/blocks/verified-entry";

// The app's contract with omazifier: the set of blocks (id → config schema + component) this app
// makes available — the shared component library every market build depends on. Runs on the server,
// so pairing schemas with "use client" component references here is what makes registration work
// across the RSC boundary. The active market's composition file is resolved separately (see the
// `active-market` alias in next.config.mjs), so this file carries no per-market knowledge.
export const registry = defineRegistry([
  { id: "hero", configSchema: heroConfig, component: Hero as any },
  { id: "offer-grid", configSchema: offerGridConfig, component: OfferGrid as any },
  { id: "draw-select", configSchema: drawSelectConfig, component: DrawSelect as any },
  { id: "draw-confirm", configSchema: drawConfirmConfig, component: DrawConfirm as any },
  { id: "draw-success", configSchema: drawSuccessConfig, component: DrawSuccess as any },
  { id: "faq", configSchema: faqConfig, component: Faq as any },
  { id: "terms", configSchema: termsConfig, component: Terms as any },
  { id: "charity-ad", configSchema: charityAdConfig, component: CharityAd as any },
  { id: "open-entry", configSchema: openEntryConfig, component: OpenEntry as any },
  { id: "verified-entry", configSchema: verifiedEntryConfig, component: VerifiedEntry as any },
]);
