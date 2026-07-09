import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "../contexts/i18n";
import type { CharityAdConfig } from "./schemas";

// A REUSABLE block: the same `charity-ad` is placed on /offers and /faq in the composition — showing
// a block can be reused across routes without duplication. Registered once.
export function CharityAd(_props: { config: CharityAdConfig }) {
  const { t } = useTranslation();
  return (
    <View style={styles.wrap} data-block="charity-ad">
      <Text style={styles.icon}>♥</Text>
      <View style={styles.text}>
        <Text style={styles.heading}>{t("charityAd.heading")}</Text>
        <Text style={styles.body}>{t("charityAd.body")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#eef7f0",
    borderWidth: 1, borderColor: "#cfe8d6", borderRadius: 12, padding: 16, marginBottom: 16,
  },
  icon: { color: "#0f9d58", fontSize: 22 },
  text: { flex: 1 },
  heading: { fontSize: 15, fontWeight: "700" },
  body: { color: "#6b7280", fontSize: 13, marginTop: 2 },
});
