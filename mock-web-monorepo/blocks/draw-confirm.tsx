"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Market } from "omazifier";
import type { DrawConfirmConfig } from "./schemas";
import { useTranslation } from "@/contexts/i18n";

// Step 2 — its own route (/draws/confirm). Reads the chosen option from the query (the cross-route
// state) and links forward/back. Registered in omazifier/registry.ts.
export function DrawConfirm({ market }: { config: DrawConfirmConfig; market: Market }) {
  const { t } = useTranslation();
  const option = useSearchParams().get("option") ?? "draws.option.single";
  return (
    <section className="draws" data-block="draw-confirm">
      <h3 className="draws__step-title">{t("draws.confirm.title")}</h3>
      <p className="draws__lead">{t("draws.confirm.lead")}</p>
      <p className="draws__selected">{t(option)}</p>
      <div className="draws__actions">
        <Link className="draws__link" href={`/${market.id}/draws`}>
          {t("draws.cta.back")}
        </Link>
        <Link className="draws__cta" href={`/${market.id}/draws/success`}>
          {t("draws.cta.confirm")}
        </Link>
      </div>
    </section>
  );
}
