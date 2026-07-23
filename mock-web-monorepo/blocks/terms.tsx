"use client";
import type { TermsConfig } from "./terms.schema";
import { useTranslation } from "@/contexts/i18n";

// DEEP-LINKABLE NESTED CONTENT behind a single registry entry. `terms` is registered; its nested
// "experience rules" section is NOT — it's addressable by a stable anchor id (`house-draw-rules`),
// so any other block (e.g. faq) can link straight to it without the registry knowing it exists.
export function Terms(_props: { config: TermsConfig }) {
  const { t } = useTranslation();
  return (
    <section className="terms" data-block="terms">
      <h2 className="section__heading">{t("terms.title")}</h2>
      <p className="terms__general">{t("terms.general")}</p>
      <ExperienceRules />
    </section>
  );
}

// Nested sub-section (not registered) — the deep-link target.
function ExperienceRules() {
  const { t } = useTranslation();
  return (
    <div className="terms__rules" id="house-draw-rules">
      <h3 className="terms__rules-title">{t("terms.rules.title")}</h3>
      <ul className="terms__rules-list">
        <li>{t("terms.rules.item1")}</li>
        <li>{t("terms.rules.item2")}</li>
      </ul>
    </div>
  );
}
