"use client";
import Link from "next/link";
import type { Market } from "omazifier";
import type { DrawSelectConfig } from "./schemas";
import { useTranslation } from "@/contexts/i18n";

// Step 1 of the draw flow — its OWN route (/draws) and block. Each option links to the confirm
// route, carrying the choice as a query param. (Previously these steps were internal state inside
// one block; now they're individually routed.) Registered in omazifier/registry.ts.
const OPTION_IDS = ["draws.option.single", "draws.option.bundle"];

export function DrawSelect({ market }: { config: DrawSelectConfig; market: Market }) {
  const { t } = useTranslation();
  return (
    <section className="draws" data-block="draw-select">
      <h2 className="section__heading">{t("draws.title")}</h2>
      <p className="draws__prompt">{t("draws.select.prompt")}</p>
      <div className="draws__options">
        {OPTION_IDS.map((id) => (
          <Link
            key={id}
            className="draws__option"
            href={`/${market.id}/draws/confirm?option=${encodeURIComponent(id)}`}
          >
            {t(id)}
          </Link>
        ))}
      </div>
    </section>
  );
}
