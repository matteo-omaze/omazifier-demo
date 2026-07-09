import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTranslation } from "../contexts/i18n";
import { useNav } from "../contexts/nav";
import type { HeroConfig } from "./schemas";

// The landing hero: campaign copy (strings by id) + nav links to the other routes. Each link's
// target is a route from config; its label is a translation id. Navigation uses the app's in-app
// router (useNav) — the native equivalent of the web hero's <Link>. Registered in omazifier/registry.ts.
export function Hero({ config }: { config: HeroConfig }) {
  const { t } = useTranslation();
  const { navigate } = useNav();
  return (
    <View style={[styles.hero, config.variant === "campaign" && styles.campaign]}>
      <Text style={styles.tag}>{t("hero.tag")}</Text>
      <Text style={styles.heading}>{t("hero.heading")}</Text>
      <Text style={styles.subheading}>{t("hero.subheading")}</Text>
      <View style={styles.nav}>
        {config.links.map((link) => (
          <Pressable key={link.to} style={styles.navLink} onPress={() => navigate(link.to)}>
            <Text style={styles.navLinkText}>{t(link.labelId)}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 16, padding: 24, marginBottom: 16, backgroundColor: "#33334d" },
  campaign: { backgroundColor: "#2a1f57" },
  tag: {
    color: "#fff", backgroundColor: "rgba(255,255,255,0.2)", alignSelf: "flex-start",
    paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999, overflow: "hidden", marginBottom: 10, fontSize: 12,
  },
  heading: { color: "#fff", fontSize: 24, fontWeight: "800" },
  subheading: { color: "#e6e3f5", marginTop: 8 },
  nav: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 20 },
  navLink: { backgroundColor: "rgba(255,255,255,0.16)", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999 },
  navLinkText: { color: "#fff", fontWeight: "600" },
});
