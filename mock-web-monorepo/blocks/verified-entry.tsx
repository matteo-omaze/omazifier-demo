"use client";
import type { VerifiedEntryConfig } from "./schemas";
import { useTranslation } from "@/contexts/i18n";

// THE SPLIT (DE side, client). Glücksspielstaatsvertrag lottery model: identity verification is
// required, no postal route. Config is the genuine per-market datum (which provider); all display
// strings — including the provider label — are translation ids. Registered in omazifier/registry.ts.
export function VerifiedEntry({ config }: { config: VerifiedEntryConfig }) {
  const { t } = useTranslation();
  const providerLabel = t(`verifiedEntry.provider.${config.provider}`);
  return (
    <section className="entry entry--verified" data-block="verified-entry">
      <span className="entry__badge entry__badge--verified">{t("verifiedEntry.badge")}</span>
      <h2 className="section__heading">{t("verifiedEntry.heading")}</h2>
      <p className="entry__body">{t("verifiedEntry.body", { provider: providerLabel })}</p>
      <p className="entry__meta">block: <code>verified-entry</code> · DE lottery model (KYC)</p>
    </section>
  );
}
