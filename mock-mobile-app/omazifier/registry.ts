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
} from "../blocks/schemas";
import { Hero } from "../blocks/Hero";
import { OfferGrid } from "../blocks/OfferGrid";
import { Faq } from "../blocks/Faq";
import { DrawSelect } from "../blocks/draw/Select";
import { DrawConfirm } from "../blocks/draw/Confirm";
import { DrawSuccess } from "../blocks/draw/Success";
import { Terms } from "../blocks/Terms";
import { CharityAd } from "../blocks/CharityAd";
import { OpenEntry } from "../blocks/entry/Open";
import { VerifiedEntry } from "../blocks/entry/Verified";

// Same contract as the web repo (identical defineRegistry shape) — only the components differ
// (RN vs DOM). This is the shared component library every market bundle depends on; the active
// market's composition is resolved separately (the `active-market` import — see metro.config.js).
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
