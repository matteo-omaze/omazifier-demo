"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import type { Market } from "omazifier";
import type { OfferGridConfig } from "./schemas";
import { useTranslation } from "@/contexts/i18n";

type Campaign = { id: string; imageUrl: string; tagKey: string; headingKey: string; ctaLabelKey: string; ctaPath: string };
type Offer = { id: string; entries: number; price: number; wasPrice: number | null; ribbon: string | null; checkoutUrl: string };
type OffersData = { campaigns?: Campaign[]; offers: Offer[] };

const VB_W = 1000;
const HALF_VB = VB_W / 2;

// CTA arc slice at the bottom — arc endpoints at y=CTA_VB_H so the base spans full width
const CTA_VB_H = 90;
const R_CTA = Math.round((CTA_VB_H * CTA_VB_H + HALF_VB * HALF_VB) / (2 * CTA_VB_H));
const CTA_D = `M 0,${CTA_VB_H} A ${R_CTA},${R_CTA} 0 0 1 ${VB_W},${CTA_VB_H} Z`;

// Arch cap at the bottom of the yellow top banner (points upward — sides down, centre up)
const ARCH_S = 40;
const R_ARCH = Math.round((ARCH_S * ARCH_S + HALF_VB * HALF_VB) / (2 * ARCH_S));
const BANNER_D = `M 0,${ARCH_S} A ${R_ARCH},${R_ARCH} 0 0 1 ${VB_W},${ARCH_S} L ${VB_W},0 L 0,0 Z`;

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
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  if (!payload) return null;
  const campaigns = payload.campaigns ?? [];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    setActiveIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const scrollToIndex = (i: number) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section className="offer-grid">
      {campaigns.length > 0 && (
        <>
          <div className="campaign-carousel" ref={carouselRef} onScroll={handleScroll}>
            {campaigns.map((c) => (
              <Link key={c.id} className="campaign-card" href={`${c.ctaPath}?imageUrl=${encodeURIComponent(c.imageUrl)}`}>
                <div className="campaign-card__bg" style={{ backgroundImage: `url(${c.imageUrl})` }} />
                <div className="campaign-card__top">
                  <div className="campaign-card__heading">{t(c.headingKey)}</div>
                </div>
                <svg
                  className="campaign-card__banner-arch"
                  viewBox={`0 0 ${VB_W} ${ARCH_S}`}
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d={BANNER_D} fill="#FFDD00" />
                </svg>
                <div className="campaign-card__spacer" />
                <div className="campaign-card__cta-wrap">
                  <svg
                    className="campaign-card__cta-svg"
                    viewBox={`0 0 ${VB_W} ${CTA_VB_H}`}
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d={CTA_D} fill="#FEFBF6" />
                  </svg>
                  <span className="campaign-card__cta-label">{t(c.ctaLabelKey)}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="campaign-controls">
            <button className="campaign-arrow" onClick={() => scrollToIndex((activeIndex - 1 + campaigns.length) % campaigns.length)} aria-label="Previous">&#8249;</button>
            {campaigns.length > 1 && (
              <div className="campaign-dots">
                {campaigns.map((_, i) => (
                  <button
                    key={i}
                    className={`campaign-dot${i === activeIndex ? " campaign-dot--active" : ""}`}
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
            <button className="campaign-arrow" onClick={() => scrollToIndex((activeIndex + 1) % campaigns.length)} aria-label="Next">&#8250;</button>
          </div>
        </>
      )}
    </section>
  );
}
