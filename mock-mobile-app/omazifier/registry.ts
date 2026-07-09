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
import { DrawSelect } from "../blocks/DrawSelect";
import { DrawConfirm } from "../blocks/DrawConfirm";
import { DrawSuccess } from "../blocks/DrawSuccess";
import { Terms } from "../blocks/Terms";
import { CharityAd } from "../blocks/CharityAd";
import { OpenEntry } from "../blocks/OpenEntry";
import { VerifiedEntry } from "../blocks/VerifiedEntry";

// Same contract as the web repo (identical defineRegistry shape) — only the components differ
// (RN vs DOM). This is the shared component library every market bundle depends on; the active
// market's composition is resolved separately (the `active-market` import — see metro.config.js).
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
