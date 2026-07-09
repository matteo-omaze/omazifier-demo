import { z } from "zod";

// Block config schemas live in a plain (server-safe) module so the SERVER can validate a
// composition without executing any "use client" component module. See ./register.ts for why.

// Configs carry only behavioural knobs + route ids — never display strings. Every string a block
// shows comes from the translation service by id. Markets differ by config/bundle, not language.
export const heroConfig = z.object({
  variant: z.enum(["campaign", "plain"]).default("plain"),
  // Landing nav: each link is a route `to` + a translation id for its label (no raw strings).
  links: z.array(z.object({ to: z.string(), labelId: z.string() })).default([]),
});

export const offerGridConfig = z.object({
  columns: z.number().int().min(1).max(4).default(3),
});

export const faqConfig = z.object({});

// The draw flow is now three routed steps, each its own block/route (select → confirm → success).
export const drawSelectConfig = z.object({});
export const drawConfirmConfig = z.object({});
export const drawSuccessConfig = z.object({});

// One registry entry whose nested sections are deep-linkable by anchor, not registered.
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
