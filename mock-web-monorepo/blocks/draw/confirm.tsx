"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Market } from "omazifier";
import type { DrawConfirmConfig } from "./confirm.schema";
import { useTranslation } from "@/contexts/i18n";

export function DrawConfirm({ config, market }: { config: DrawConfirmConfig; market: Market }) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const entries = Number(searchParams.get("entries") ?? "0");
  const priceCents = Number(searchParams.get("price") ?? "0");
  const imageUrl = searchParams.get("imageUrl") ?? config.imageUrl;
  const money = new Intl.NumberFormat(market.locale, { style: "currency", currency: market.currency });

  return (
    <section className="draw-review" data-block="draw-confirm">
      {imageUrl && (
        <div className="draw-review__bg" style={{ backgroundImage: `url(${imageUrl})` }} />
      )}
      <div className="draw-review__sheet">
        <div className="draw-review__entries">{t("offerGrid.entries", { count: entries })}</div>
        <div className="draw-review__price">{money.format(priceCents / 100)}</div>
        <Link className="draw-review__cta" href="/draws/success">
          {t("draws.cta.confirm")}
        </Link>
      </div>
    </section>
  );
}
