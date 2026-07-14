import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTranslation } from "../../contexts/i18n";
import { useNav } from "../../contexts/nav";
import type { DrawSuccessConfig } from "../schemas";

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
  wrap: { backgroundColor: "#FFDD00", padding: 40, paddingVertical: 52, marginBottom: 16, alignItems: "center" },
  title: { fontSize: 40, fontWeight: "900", lineHeight: 38, marginBottom: 20, color: "#081F28", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "center" },
  lead: { color: "rgba(8,31,40,0.65)", marginBottom: 36, textAlign: "center", lineHeight: 20, letterSpacing: -0.14, fontSize: 15 },
  link: { color: "#FEFBF6", backgroundColor: "#081F28", fontWeight: "800", borderRadius: 999, paddingHorizontal: 32, paddingVertical: 16, letterSpacing: 0.32, fontSize: 16 },
});
