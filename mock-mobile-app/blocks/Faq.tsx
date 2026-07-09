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
  wrap: { marginBottom: 16 },
  heading: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  item: { borderTopWidth: 1, borderTopColor: "#e5e7eb", paddingVertical: 10 },
  q: { fontWeight: "600" },
  a: { color: "#6b7280", marginTop: 2 },
  rulesLink: { color: "#6c5ce7", fontWeight: "600", marginTop: 14 },
});
