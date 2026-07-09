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
  wrap: { backgroundColor: "#fff", borderRadius: 12, padding: 20, marginBottom: 16 },
  heading: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  general: { color: "#6b7280", marginBottom: 12 },
  rules: { borderTopWidth: 1, borderTopColor: "#e5e7eb", paddingTop: 12 },
  rulesTitle: { fontSize: 15, fontWeight: "700", marginBottom: 8 },
  rule: { color: "#6b7280", marginBottom: 6 },
});
