import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "../contexts/i18n";
import type { CharityAdConfig } from "./schemas";

export function CharityAd(_props: { config: CharityAdConfig }) {
  const { t } = useTranslation();
  return (
    <View style={styles.wrap} data-block="charity-ad">
      <Text style={styles.beaconText}>SUPPORTING</Text>
      <Text style={styles.heading}>{t("charityAd.heading")}</Text>
      <Text style={styles.body}>{t("charityAd.body")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#081F28",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(255,221,0,0.2)",
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 16,
  },
  beaconText: { color: "#FFDD00", fontSize: 11, fontWeight: "800", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 },
  heading: { fontSize: 16, fontWeight: "700", color: "#FEFBF6", marginBottom: 4 },
  body: { color: "rgba(254,251,246,0.6)", fontSize: 13, lineHeight: 18 },
});
