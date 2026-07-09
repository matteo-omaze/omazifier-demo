"use client";
import type { OpenEntryConfig } from "./schemas";
import { useTranslation } from "@/contexts/i18n";

// THE SPLIT (UK side, client). Prize Competitions Act model: a free postal entry route. No config —
// every display string (including the postal address) comes from the translation service by id.
// Registered in omazifier/registry.ts.
export function OpenEntry(_props: { config: OpenEntryConfig }) {
  const { t } = useTranslation();
  return (
    <section className="entry entry--open" data-block="open-entry">
      <span className="entry__badge entry__badge--open">{t("openEntry.badge")}</span>
      <h2 className="section__heading">{t("openEntry.heading")}</h2>
      <p className="entry__body">{t("openEntry.body")}</p>
      <address className="entry__address">{t("openEntry.postalAddress")}</address>
      <p className="entry__meta">block: <code>open-entry</code> · UK prize-competition model</p>
    </section>
  );
}
