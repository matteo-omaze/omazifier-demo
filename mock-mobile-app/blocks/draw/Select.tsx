import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTranslation } from "../../contexts/i18n";
import { useNav } from "../../contexts/nav";
import type { Market } from "omazifier";
import type { DrawSelectConfig } from "../schemas";

type Offer = { id: string; entries: number; price: number; wasPrice: number | null; ribbon: string | null };
type OffersData = { offers: Offer[] };

const { width } = Dimensions.get("window");
const CARD_W = width - 32;

const ARCH_H = 28;
const R_SEP = ((CARD_W / 2) * (CARD_W / 2) + ARCH_H * ARCH_H) / (2 * ARCH_H);
const DOME = `M 0,${ARCH_H} A ${R_SEP},${R_SEP} 0 0 1 ${CARD_W},${ARCH_H} Z`;

const TOP_H = 108;
const MID_H = 100;
const BOT_H = 64;
const CARD_H = TOP_H + MID_H + BOT_H;

export function DrawSelect({ data, market }: { config: DrawSelectConfig; data: { offers?: OffersData }; market: Market }) {
  const { t } = useTranslation();
  const { navigate, params } = useNav();
  const imageUrl = params.imageUrl as string | undefined;
  const offers = data.offers?.offers ?? [];
  const money = new Intl.NumberFormat(market.locale, { style: "currency", currency: market.currency });

  return (
    <View style={styles.sheet}>
      <Text style={styles.heading}>{t("offerGrid.heading")}</Text>
      <View style={styles.cardList}>
        {offers.map((o) => (
          <Pressable
            key={o.id}
            style={styles.card}
            onPress={() => navigate("/draws/confirm", {
              entries: String(o.entries),
              price: String(o.price),
              ...(imageUrl ? { imageUrl } : {}),
            })}
          >
            <View style={styles.topBand}>
              {o.ribbon ? (
                <View style={styles.pill}>
                  <Text style={styles.pillText}>{t(o.ribbon)}</Text>
                </View>
              ) : null}
              <Text style={styles.entriesText}>{t("offerGrid.entries", { count: o.entries })}</Text>
            </View>

            <View style={styles.midBand}>
              <Text style={styles.priceText}>{money.format(o.price / 100)}</Text>
              {o.wasPrice ? <Text style={styles.wasText}>{money.format(o.wasPrice / 100)}</Text> : null}
            </View>

            <View style={styles.botBand}>
              <Text style={styles.ctaText}>{t("offerGrid.cta")}</Text>
            </View>

            <Svg width={CARD_W} height={ARCH_H} style={{ position: "absolute", top: TOP_H - ARCH_H, left: 0 }}>
              <Path d={DOME} fill="#081F28" />
            </Svg>

            <Svg width={CARD_W} height={ARCH_H} style={{ position: "absolute", top: TOP_H + MID_H - ARCH_H, left: 0 }}>
              <Path d={DOME} fill="#FFDD00" />
            </Svg>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: "#081F28",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 32,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  heading: { color: "#FEFBF6", fontSize: 22, fontWeight: "800", marginBottom: 20, letterSpacing: -0.2 },
  cardList: { gap: 14 },
  card: {
    width: CARD_W,
    height: CARD_H,
    overflow: "hidden",
    alignSelf: "center",
  },
  topBand: {
    height: TOP_H,
    backgroundColor: "#FEFBF6",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: ARCH_H,
  },
  midBand: {
    height: MID_H,
    backgroundColor: "#081F28",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: ARCH_H,
  },
  botBand: {
    height: BOT_H,
    backgroundColor: "#FFDD00",
    alignItems: "center",
    justifyContent: "center",
  },
  pill: {
    backgroundColor: "#FFDD00",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 10,
  },
  pillText: {
    color: "#081F28",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  entriesText: {
    color: "#081F28",
    fontSize: 18,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  priceText: {
    color: "#FEFBF6",
    fontSize: 44,
    fontWeight: "900",
    lineHeight: 42,
  },
  wasText: {
    color: "rgba(254,251,246,0.4)",
    textDecorationLine: "line-through",
    fontSize: 15,
    marginTop: 4,
  },
  ctaText: {
    color: "#081F28",
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
