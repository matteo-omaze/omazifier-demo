import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTranslation } from "../contexts/i18n";
import { useNav } from "../contexts/nav";
import type { DrawSuccessConfig } from "./schemas";

// Step 3 — its own route (/draws/success). Registered in omazifier/registry.ts.
export function DrawSuccess(_props: { config: DrawSuccessConfig }) {
  const { t } = useTranslation();
  const { navigate } = useNav();
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{t("draws.success.title")}</Text>
      <Text style={styles.lead}>{t("draws.success.body")}</Text>
      <Pressable onPress={() => navigate("/draws")}><Text style={styles.link}>{t("draws.cta.restart")}</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: "#fff", borderRadius: 12, padding: 20, marginBottom: 16 },
  title: { fontSize: 16, fontWeight: "700", marginBottom: 6, color: "#0f9d58" },
  lead: { color: "#6b7280", marginBottom: 8 },
  link: { color: "#6c5ce7", fontWeight: "600" },
});
