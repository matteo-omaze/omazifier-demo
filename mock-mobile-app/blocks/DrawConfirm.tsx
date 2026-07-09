import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTranslation } from "../contexts/i18n";
import { useNav } from "../contexts/nav";
import type { DrawConfirmConfig } from "./schemas";

// Step 2 — its own route (/draws/confirm). Reads the chosen option from the nav params (cross-route
// state) and navigates forward/back. Registered in omazifier/registry.ts.
export function DrawConfirm(_props: { config: DrawConfirmConfig }) {
  const { t } = useTranslation();
  const { params, navigate } = useNav();
  const option = params.option ?? "draws.option.single";
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{t("draws.confirm.title")}</Text>
      <Text style={styles.lead}>{t("draws.confirm.lead")}</Text>
      <Text style={styles.selected}>{t(option)}</Text>
      <View style={styles.actions}>
        <Pressable onPress={() => navigate("/draws")}><Text style={styles.link}>{t("draws.cta.back")}</Text></Pressable>
        <Pressable style={styles.cta} onPress={() => navigate("/draws/success")}>
          <Text style={styles.ctaText}>{t("draws.cta.confirm")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: "#fff", borderRadius: 12, padding: 20, marginBottom: 16 },
  title: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  lead: { color: "#6b7280", marginBottom: 8 },
  selected: { fontWeight: "700", marginBottom: 12 },
  actions: { flexDirection: "row", alignItems: "center", gap: 16 },
  link: { color: "#6c5ce7", fontWeight: "600" },
  cta: { backgroundColor: "#221943", borderRadius: 8, paddingHorizontal: 20, paddingVertical: 12 },
  ctaText: { color: "#fff", fontWeight: "700" },
});
