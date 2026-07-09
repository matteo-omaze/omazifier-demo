"use client";
import Link from "next/link";
import type { Market } from "omazifier";
import type { HeroConfig } from "./schemas";
import { useTranslation } from "@/contexts/i18n";

// The landing hero: campaign copy (strings by id) + nav links to the other routes. Each link's
// target is a route from config; its label is a translation id. (Demo: market is a URL segment, so
// links are prefixed with `/${market.id}`; in production the market is the deployment, no prefix.)
// Registered in omazifier/registry.ts.
export function Hero({ config, market }: { config: HeroConfig; market: Market }) {
  const { t } = useTranslation();
  return (
    <section className={`hero hero--${config.variant}`}>
      <span className="hero__tag">{t("hero.tag")}</span>
      <h1 className="hero__heading">{t("hero.heading")}</h1>
      <p className="hero__subheading">{t("hero.subheading")}</p>
      <nav className="hero__nav">
        {config.links.map((link) => (
          <Link key={link.to} className="hero__nav-link" href={`/${market.id}${link.to}`}>
            {t(link.labelId)}
          </Link>
        ))}
      </nav>
    </section>
  );
}
