"use client";
import Link from "next/link";
import type { Market } from "omazifier";
import type { DrawSuccessConfig } from "../schemas";
import { useTranslation } from "@/contexts/i18n";

export function DrawSuccess({ market }: { config: DrawSuccessConfig; market: Market }) {
  const { t } = useTranslation();
  return (
    <section className="draw-success" data-block="draw-success">
      <h2 className="draw-success__title">{t("draws.success.title")}</h2>
      <p className="draw-success__body">{t("draws.success.body")}</p>
      <Link className="draw-success__link" href="/draws">
        {t("draws.cta.restart")}
      </Link>
    </section>
  );
}
