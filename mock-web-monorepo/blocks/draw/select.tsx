"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Market } from "omazifier";
import type { DrawSelectConfig } from "../schemas";
import { useTranslation } from "@/contexts/i18n";

type Offer = { id: string; entries: number; price: number; wasPrice: number | null; ribbon: string | null };
type OffersData = { offers: Offer[] };

export function DrawSelect({ data, market }: { config: DrawSelectConfig; data: { offers?: OffersData }; market: Market }) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("imageUrl");
  const offers = data.offers?.offers ?? [];
  const money = new Intl.NumberFormat(market.locale, { style: "currency", currency: market.currency });
  const confirmBase = `/draws/confirm`;

  return (
    <div className="offer-grid__sheet" data-block="draw-select">
      <h2 className="offer-grid__heading">{t("offerGrid.heading")}</h2>
      <div className="bundle-list">
        {offers.map((o) => {
          const href = `${confirmBase}?entries=${o.entries}&price=${o.price}${imageUrl ? `&imageUrl=${encodeURIComponent(imageUrl)}` : ""}`;
          return (
            <Link key={o.id} className="bundle-card" href={href}>
              <div className="bundle-card__top">
                {o.ribbon ? <span className="bundle-card__pill">{t(o.ribbon)}</span> : null}
                <span className="bundle-card__entries">{t("offerGrid.entries", { count: o.entries })}</span>
              </div>
              <div className="bundle-card__mid">
                <span className="bundle-card__price">{money.format(o.price / 100)}</span>
                {o.wasPrice ? <span className="bundle-card__was">{money.format(o.wasPrice / 100)}</span> : null}
              </div>
              <div className="bundle-card__bot">
                <span className="bundle-card__cta">{t("offerGrid.cta")}</span>
              </div>
              <div className="bundle-card__sep bundle-card__sep--dark" />
              <div className="bundle-card__sep bundle-card__sep--yellow" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
