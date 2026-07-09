"use client";
import type { Market } from "omazifier";
import type { OfferGridConfig } from "./schemas";
import { useTranslation } from "@/contexts/i18n";

// SHARED configurable block (client). The offers list comes from the BFF binding; currency
// formatting uses the `market` prop (locale + currency) — no longer smuggled through the data.
// All display strings resolve by id. Registered in omazifier/registry.ts.
type Offer = {
  id: string;
  entries: number;
  price: number; // minor units (pence / cents)
  wasPrice: number | null;
  ribbon: string | null; // a translation id (e.g. "offerGrid.ribbon.mostPopular"), not text
  checkoutUrl: string;
};
type OffersData = { offers: Offer[] };

export function OfferGrid({
  config,
  data,
  market,
}: {
  config: OfferGridConfig;
  data: { offers?: OffersData };
  market: Market;
}) {
  const { t } = useTranslation();
  const payload = data.offers;
  if (!payload) return null;
  const money = new Intl.NumberFormat(market.locale, {
    style: "currency",
    currency: market.currency,
  });

  return (
    <section className="offer-grid">
      <h2 className="section__heading">{t("offerGrid.heading")}</h2>
      <div className="offer-grid__cards" style={{ gridTemplateColumns: `repeat(${config.columns}, 1fr)` }}>
        {payload.offers.map((o) => (
          <div key={o.id} className="offer-card">
            {o.ribbon ? <span className="offer-card__ribbon">{t(o.ribbon)}</span> : null}
            <div className="offer-card__entries">{t("offerGrid.entries", { count: o.entries })}</div>
            <div className="offer-card__price">{money.format(o.price / 100)}</div>
            {o.wasPrice ? (
              <div className="offer-card__was">{money.format(o.wasPrice / 100)}</div>
            ) : null}
            <a className="offer-card__cta" href={o.checkoutUrl}>
              {t("offerGrid.cta")}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
