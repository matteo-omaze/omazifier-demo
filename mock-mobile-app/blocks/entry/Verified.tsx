import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTranslation } from "../../contexts/i18n";
import type { VerifiedEntryConfig } from "../schemas";

// THE SPLIT (DE side), React Native. KYC required, no postal route. Only config is which provider;
// all display strings — including the provider label — are translation ids.
export function VerifiedEntry({ config }: { config: VerifiedEntryConfig }) {
  const { t } = useTranslation();
  const providerLabel = t(`verifiedEntry.provider.${config.provider}`);
  return (
    <View style={styles.wrap}>
      <Text style={styles.icon}>🪪</Text>
      <Text style={styles.badge}>{t("verifiedEntry.badge")}</Text>
      <Text style={styles.heading}>{t("verifiedEntry.heading")}</Text>
      <Text style={styles.body}>{t("verifiedEntry.body", { provider: providerLabel })}</Text>
      <Pressable style={styles.cta} onPress={() => {}}>
        <Text style={styles.ctaText}>{t("verifiedEntry.cta")}</Text>
      </Pressable>
      <Text style={styles.meta}>block: verified-entry · DE lottery model (KYC)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: "#081F28", borderRadius: 20, padding: 28, marginBottom: 16, marginHorizontal: 16 },
  icon: { fontSize: 80, marginBottom: 12 },
  badge: {
    color: "#FFDD00", fontSize: 11, fontWeight: "800",
    letterSpacing: 2, textTransform: "uppercase", marginBottom: 14,
  },
  heading: { fontSize: 26, fontWeight: "900", lineHeight: 28, color: "#FEFBF6", textTransform: "uppercase" },
  body: { color: "rgba(254,251,246,0.7)", marginTop: 12, lineHeight: 20, letterSpacing: -0.14 },
  cta: {
    marginTop: 20, backgroundColor: "#FFDD00", borderRadius: 999,
    paddingVertical: 14, paddingHorizontal: 28, alignSelf: "flex-start",
  },
  ctaText: { color: "#081F28", fontWeight: "800", fontSize: 15, letterSpacing: 0.3, textTransform: "uppercase" },
  meta: { color: "rgba(254,251,246,0.3)", fontSize: 12, marginTop: 16 },
});
