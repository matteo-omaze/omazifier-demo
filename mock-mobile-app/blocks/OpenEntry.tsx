import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "../contexts/i18n";
import type { OpenEntryConfig } from "./schemas";

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
  wrap: {
    backgroundColor: "#fff", borderRadius: 12, padding: 20, marginBottom: 16,
    borderLeftWidth: 6, borderLeftColor: "#0f9d58",
  },
  badge: {
    alignSelf: "flex-start", backgroundColor: "#e4f5ec", color: "#0f9d58", fontSize: 12,
    fontWeight: "700", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, overflow: "hidden", marginBottom: 8,
  },
  heading: { fontSize: 18, fontWeight: "700" },
  body: { color: "#1a1a2e", marginTop: 6 },
  address: { fontWeight: "600", marginTop: 6 },
  meta: { color: "#6b7280", fontSize: 12, marginTop: 10 },
});
