"use client";
import type { FaqConfig } from "./faq.schema";
import { useTranslation } from "@/contexts/i18n";

// SHARED configurable block (client). FAQ items are CONTENT — bound from Sanity (runtime).
// The heading is a translation (same id per market), so it's no longer config. Registered in omazifier/registry.ts.
type FaqItem = { q: string; a: string };

export function Faq({ data }: { config: FaqConfig; data: { items?: FaqItem[] } }) {
  const { t } = useTranslation();
  const items = data.items ?? [];
  return (
    <section className="faq">
      <h2 className="section__heading">{t("faq.heading")}</h2>
      <dl className="faq__list">
        {items.map((item, i) => (
          <div key={i} className="faq__item">
            <dt className="faq__q">{item.q}</dt>
            <dd className="faq__a">{item.a}</dd>
          </div>
        ))}
      </dl>
      {/* Deep link straight to a nested sub-section of the `terms` block (not a registered block). */}
      <a className="faq__rules-link" href="#house-draw-rules">
        {t("faq.rulesLink")}
      </a>
    </section>
  );
}
