import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTranslation } from "../contexts/i18n";
import { useNav } from "../contexts/nav";
import type { DrawSelectConfig } from "./schemas";

// Step 1 of the draw flow — its own route (/draws) and block. Each option navigates to the confirm
// route, carrying the choice as a nav param. Registered in omazifier/registry.ts.
const OPTION_IDS = ["draws.option.single", "draws.option.bundle"];

export function DrawSelect(_props: { config: DrawSelectConfig }) {
  const { t } = useTranslation();
  const { navigate } = useNav();
  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>{t("draws.title")}</Text>
      <Text style={styles.prompt}>{t("draws.select.prompt")}</Text>
      {OPTION_IDS.map((id) => (
        <Pressable key={id} style={styles.option} onPress={() => navigate("/draws/confirm", { option: id })}>
          <Text>{t(id)}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: "#fff", borderRadius: 12, padding: 20, marginBottom: 16 },
  heading: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  prompt: { color: "#6b7280", marginBottom: 10 },
  option: { borderWidth: 2, borderColor: "#e5e7eb", borderRadius: 10, padding: 14, marginBottom: 8 },
});
