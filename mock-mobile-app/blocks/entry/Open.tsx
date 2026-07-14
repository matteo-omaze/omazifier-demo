import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "../../contexts/i18n";
import type { OpenEntryConfig } from "../schemas";

// THE SPLIT (UK side), React Native. Free postal entry route. No config — every display string
// (including the postal address) comes from the translation service by id.
export function OpenEntry(_props: { config: OpenEntryConfig }) {
  const { t } = useTranslation();
  return (
    <View style={styles.wrap}>
      <Text style={styles.badge}>{t("openEntry.badge")}</Text>
      <Text style={styles.heading}>{t("openEntry.heading")}</Text>
      <Text style={styles.body}>{t("openEntry.body")}</Text>
      <Text style={styles.address}>{t("openEntry.postalAddress")}</Text>
      <Text style={styles.meta}>block: open-entry · UK prize-competition model</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: "#081F28", borderRadius: 20, padding: 28, marginBottom: 16, marginHorizontal: 16 },
  badge: {
    color: "#FFDD00", fontSize: 11, fontWeight: "800",
    letterSpacing: 2, textTransform: "uppercase", marginBottom: 14,
  },
  heading: { fontSize: 26, fontWeight: "900", lineHeight: 24, color: "#FEFBF6", textTransform: "uppercase" },
  body: { color: "rgba(254,251,246,0.7)", marginTop: 12, lineHeight: 20, letterSpacing: -0.14 },
  address: { fontWeight: "700", marginTop: 10, color: "#FEFBF6" },
  meta: { color: "rgba(254,251,246,0.3)", fontSize: 12, marginTop: 16 },
});
