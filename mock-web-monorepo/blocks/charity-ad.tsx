"use client";
import type { CharityAdConfig } from "./schemas";
import { useTranslation } from "@/contexts/i18n";

// A REUSABLE block: the same `charity-ad` is placed on more than one page (/offers and /faq) in the
// composition — showing a block can be reused across routes without duplication. Registered once.
export function CharityAd(_props: { config: CharityAdConfig }) {
  const { t } = useTranslation();
  return (
    <section className="charity-ad" data-block="charity-ad">
      <span className="charity-ad__icon">♥</span>
      <div>
        <h3 className="charity-ad__heading">{t("charityAd.heading")}</h3>
        <p className="charity-ad__body">{t("charityAd.body")}</p>
      </div>
    </section>
  );
}
