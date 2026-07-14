import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "../contexts/i18n";
import type { TermsConfig } from "./schemas";

// DEEP-LINKABLE NESTED CONTENT behind a single registry entry (React Native). `terms` is registered;
// its nested "experience rules" is not — on web it's anchor-addressable (#house-draw-rules); on a
// native app the same target would be reached via navigation/scroll (the FAQ shows the sample link).
export function Terms(_props: { config: TermsConfig }) {
  const { t } = useTranslation();
  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>{t("terms.title")}</Text>
      <Text style={styles.general}>{t("terms.general")}</Text>
      <ExperienceRules />
    </View>
  );
}

function ExperienceRules() {
  const { t } = useTranslation();
  return (
    <View style={styles.rules}>
      <Text style={styles.rulesTitle}>{t("terms.rules.title")}</Text>
      <Text style={styles.rule}>• {t("terms.rules.item1")}</Text>
      <Text style={styles.rule}>• {t("terms.rules.item2")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: "#081F28", borderRadius: 20, padding: 28, marginBottom: 16, marginHorizontal: 16 },
  heading: { fontSize: 22, fontWeight: "900", lineHeight: 28, marginBottom: 14, color: "#FFDD00", textTransform: "uppercase" },
  general: { color: "rgba(255,255,255,0.65)", marginBottom: 16, lineHeight: 15, letterSpacing: -0.14 },
  rules: { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.12)", paddingTop: 16 },
  rulesTitle: { fontSize: 16, fontWeight: "700", marginBottom: 10, color: "#FEFBF6", lineHeight: 18, letterSpacing: -0.16 },
  rule: { color: "rgba(255,255,255,0.65)", marginBottom: 8, lineHeight: 15, letterSpacing: -0.14 },
});
