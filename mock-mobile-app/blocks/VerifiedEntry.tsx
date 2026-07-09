import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "../contexts/i18n";
import type { VerifiedEntryConfig } from "./schemas";

// THE SPLIT (DE side), React Native. KYC required, no postal route. Only config is which provider;
// all display strings — including the provider label — are translation ids.
export function VerifiedEntry({ config }: { config: VerifiedEntryConfig }) {
  const { t } = useTranslation();
  const providerLabel = t(`verifiedEntry.provider.${config.provider}`);
  return (
    <View style={styles.wrap}>
      <Text style={styles.badge}>{t("verifiedEntry.badge")}</Text>
      <Text style={styles.heading}>{t("verifiedEntry.heading")}</Text>
      <Text style={styles.body}>{t("verifiedEntry.body", { provider: providerLabel })}</Text>
      <Text style={styles.meta}>block: verified-entry · DE lottery model (KYC)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#fff", borderRadius: 12, padding: 20, marginBottom: 16,
    borderLeftWidth: 6, borderLeftColor: "#d98300",
  },
  badge: {
    alignSelf: "flex-start", backgroundColor: "#fbefd8", color: "#d98300", fontSize: 12,
    fontWeight: "700", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, overflow: "hidden", marginBottom: 8,
  },
  heading: { fontSize: 18, fontWeight: "700" },
  body: { color: "#1a1a2e", marginTop: 6 },
  meta: { color: "#6b7280", fontSize: 12, marginTop: 10 },
});
