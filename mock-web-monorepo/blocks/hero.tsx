"use client";
import Link from "next/link";
import type { Market } from "omazifier";
import type { HeroConfig } from "./schemas";
import { useTranslation } from "@/contexts/i18n";

const VB_W = 1000;
const SAGITTA = 60;
const HALF_VB = VB_W / 2;
const R = Math.round((SAGITTA * SAGITTA + HALF_VB * HALF_VB) / (2 * SAGITTA));

const ARC_D = `M 0,${SAGITTA} A ${R},${R} 0 0 1 ${VB_W},${SAGITTA}`;

export function Hero({ config, market }: { config: HeroConfig; market: Market }) {
  const { t } = useTranslation();

  const primaryLink = config.primaryCtaLabelId
    ? config.links.find((l) => l.labelId === config.primaryCtaLabelId)
    : config.links[0];
  const secondaryLinks = config.links.filter((l) => l !== primaryLink);

  return (
    <>
      <section className="hero">
        {config.imageUrl && (
          <div className="hero__bg" style={{ backgroundImage: `url(${config.imageUrl})` }} />
        )}

        {/* Large heading at the top */}
        <h1 className="hero__heading">{t("hero.heading")}</h1>

        <div className="hero__spacer" />

        {/* Bottom row: large italic sub on left, compact pill on right */}
        <div className="hero__bottom-row">
          <span className="hero__heading-sub">{t("hero.headingSub")}</span>
          {primaryLink && (
            <Link className="hero__cta-pill" href={primaryLink.to}>
              {t("hero.cta")}
            </Link>
          )}
        </div>
      </section>

      {secondaryLinks.length > 0 && (
        <nav className="hero__secondary-nav">
          {secondaryLinks.map((link) => (
            <Link key={link.to} className="hero__secondary-link" href={link.to}>
              {t(link.labelId)}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
