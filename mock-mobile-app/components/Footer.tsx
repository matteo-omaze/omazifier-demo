import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "../contexts/i18n";

// App CHROME (not an omazifier block): the same footer on every route. Its text is a translation id,
// so it renders inside the app's translation context (AppShell).
export function Footer() {
  const { t } = useTranslation();
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>{t("footer.legal")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { paddingVertical: 20, paddingHorizontal: 8 },
  text: { color: "#6b7280", fontSize: 12, textAlign: "center" },
});
