"use client";
import { useTranslation } from "@/contexts/i18n";

// App CHROME (not an omazifier block): the same footer on every route. Its text is a translation
// id resolved from the app's context (so it's inside AppShell's provider).
export function Footer() {
  const { t } = useTranslation();
  return <footer className="appfooter">{t("footer.legal")}</footer>;
}
