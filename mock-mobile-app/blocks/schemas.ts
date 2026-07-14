import { z } from "zod";

// Block config schemas — identical to the web repo's. (In reality this could be a shared package
// published by the design system; here it's duplicated to keep the repos independent.)

// Configs carry only behavioural knobs — never display strings. Every string a block shows comes
// from the translation service by id (see lib/i18n). Markets differ by config/bundle, not language.
export const heroConfig = z.object({
  links: z.array(z.object({ to: z.string(), labelId: z.string() })).default([]),
  imageUrl: z.string().optional(),
  primaryCtaLabelId: z.string().optional(),
});

export const offerGridConfig = z.object({
  columns: z.number().int().min(1).max(4).default(3),
});

export const faqConfig = z.object({});

// The draw flow is three routed steps: select (bundle pick) → confirm (image + value review) → success.
export const drawSelectConfig = z.object({});
export const drawConfirmConfig = z.object({
  imageUrl: z.string().optional(),
});
export const drawSuccessConfig = z.object({});

// One registry entry whose nested sections are deep-linkable, not registered.
export const termsConfig = z.object({});

// A reusable block placed on multiple pages (/offers and /faq).
export const charityAdConfig = z.object({});

export const openEntryConfig = z.object({});

export const verifiedEntryConfig = z.object({
  provider: z.enum(["schufa", "postident"]),
});

export type HeroConfig = z.infer<typeof heroConfig>;
export type OfferGridConfig = z.infer<typeof offerGridConfig>;
export type FaqConfig = z.infer<typeof faqConfig>;
export type DrawSelectConfig = z.infer<typeof drawSelectConfig>;
export type DrawConfirmConfig = z.infer<typeof drawConfirmConfig>;
export type DrawSuccessConfig = z.infer<typeof drawSuccessConfig>;
export type TermsConfig = z.infer<typeof termsConfig>;
export type CharityAdConfig = z.infer<typeof charityAdConfig>;
export type OpenEntryConfig = z.infer<typeof openEntryConfig>;
export type VerifiedEntryConfig = z.infer<typeof verifiedEntryConfig>;
