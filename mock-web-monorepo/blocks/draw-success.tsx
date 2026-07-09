"use client";
import Link from "next/link";
import type { Market } from "omazifier";
import type { DrawSuccessConfig } from "./schemas";
import { useTranslation } from "@/contexts/i18n";

// Step 3 — its own route (/draws/success). Registered in omazifier/registry.ts.
export function DrawSuccess({ market }: { config: DrawSuccessConfig; market: Market }) {
  const { t } = useTranslation();
  return (
    <section className="draws draws__step--success" data-block="draw-success">
      <h3 className="draws__step-title">{t("draws.success.title")}</h3>
      <p className="draws__lead">{t("draws.success.body")}</p>
      <Link className="draws__link" href={`/${market.id}/draws`}>
        {t("draws.cta.restart")}
      </Link>
    </section>
  );
}
