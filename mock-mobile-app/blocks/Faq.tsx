import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTranslation } from "../contexts/i18n";
import type { FaqConfig } from "./schemas";

type FaqItem = { q: string; a: string };

export function Faq({ data }: { config: FaqConfig; data: { items?: FaqItem[] } }) {
  const { t } = useTranslation();
  const items = data.items ?? [];
  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>{t("faq.heading")}</Text>
      {items.map((item, i) => (
        <View key={i} style={styles.item}>
          <Text style={styles.q}>{item.q}</Text>
          <Text style={styles.a}>{item.a}</Text>
        </View>
      ))}
      {/* Deep link to the terms block's nested experience rules. On web this is an anchor; on a
          native app it would navigate/scroll to that section (sample link for the demo). */}
      <Pressable onPress={() => {}}>
        <Text style={styles.rulesLink}>{t("faq.rulesLink")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 16, paddingHorizontal: 16, paddingTop: 20 },
  heading: { fontSize: 22, fontWeight: "900", lineHeight: 28, marginBottom: 14, color: "#FFDD00" },
  item: { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.12)", paddingVertical: 14 },
  q: { fontWeight: "700", color: "#FEFBF6", lineHeight: 16, letterSpacing: -0.14, fontSize: 15 },
  a: { color: "rgba(255,255,255,0.65)", marginTop: 4, lineHeight: 15, letterSpacing: -0.14 },
  rulesLink: { color: "#FFDD00", fontWeight: "700", marginTop: 16, letterSpacing: 0.28 },
});
