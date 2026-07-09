import { View, Text, StyleSheet, Linking, Pressable } from "react-native";
import type { Market } from "omazifier";
import { useTranslation } from "../contexts/i18n";
import type { OfferGridConfig } from "./schemas";

// Strings resolve by id from the app's translation context; currency formatting uses the `market`
// prop (locale + currency), not the data payload.
type Offer = {
  id: string;
  entries: number;
  price: number;
  wasPrice: number | null;
  ribbon: string | null; // a translation id, not text
  checkoutUrl: string;
};
type OffersData = { offers: Offer[] };

export function OfferGrid({ data, market }: { config: OfferGridConfig; data: { offers?: OffersData }; market: Market }) {
  const { t } = useTranslation();
  const payload = data.offers;
  if (!payload) return null;
  const money = new Intl.NumberFormat(market.locale, {
    style: "currency",
    currency: market.currency,
  });

  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>{t("offerGrid.heading")}</Text>
      {payload.offers.map((o) => (
        <View key={o.id} style={styles.card}>
          {o.ribbon ? <Text style={styles.ribbon}>{t(o.ribbon)}</Text> : null}
          <Text style={styles.entries}>{t("offerGrid.entries", { count: o.entries })}</Text>
          <Text style={styles.price}>{money.format(o.price / 100)}</Text>
          {o.wasPrice ? <Text style={styles.was}>{money.format(o.wasPrice / 100)}</Text> : null}
          <Pressable style={styles.cta} onPress={() => Linking.openURL(o.checkoutUrl)}>
            <Text style={styles.ctaText}>{t("offerGrid.cta")}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 16 },
  heading: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  card: {
    backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 10, alignItems: "center",
  },
  ribbon: {
    backgroundColor: "#6c5ce7", color: "#fff", fontSize: 12, paddingHorizontal: 10,
    paddingVertical: 3, borderRadius: 999, overflow: "hidden", marginBottom: 6,
  },
  entries: { color: "#6b7280", fontSize: 14 },
  price: { fontSize: 24, fontWeight: "800", marginVertical: 4 },
  was: { color: "#6b7280", textDecorationLine: "line-through", fontSize: 13 },
  cta: { backgroundColor: "#221943", borderRadius: 8, paddingHorizontal: 20, paddingVertical: 10, marginTop: 10 },
  ctaText: { color: "#fff", fontWeight: "600" },
});
