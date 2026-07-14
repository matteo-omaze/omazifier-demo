import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "../contexts/i18n";

export function Footer() {
  const { t } = useTranslation();
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>{t("footer.legal")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { paddingVertical: 24, paddingHorizontal: 16, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.08)" },
  text: { color: "rgba(255,255,255,0.45)", fontSize: 12, textAlign: "center" },
});
