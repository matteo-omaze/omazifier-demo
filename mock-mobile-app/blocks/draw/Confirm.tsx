import { View, Text, Pressable, StyleSheet, ImageBackground, Dimensions } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { useTranslation } from "../../contexts/i18n";
import { useNav } from "../../contexts/nav";
import type { Market } from "omazifier";
import type { DrawConfirmConfig } from "../schemas";

const { width } = Dimensions.get("window");
const CARD_H = Math.round(width * 1.4);

export function DrawConfirm({ config, market }: { config: DrawConfirmConfig; market: Market }) {
  const { t } = useTranslation();
  const { params, navigate } = useNav();
  const entries = Number(params.entries ?? "0");
  const priceCents = Number(params.price ?? "0");
  const imageUrl = (params.imageUrl as string | undefined) ?? config.imageUrl;
  const money = new Intl.NumberFormat(market.locale, { style: "currency", currency: market.currency });

  return (
    <ImageBackground
      source={{ uri: imageUrl }}
      style={styles.card}
      resizeMode="cover"
    >
      <Svg width={width} height={CARD_H} style={StyleSheet.absoluteFillObject}>
        <Defs>
          <LinearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0.35" stopColor="#081F28" stopOpacity="0" />
            <Stop offset="1" stopColor="#081F28" stopOpacity="0.85" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width={width} height={CARD_H} fill="url(#cardGrad)" />
      </Svg>
      <View style={styles.overlay}>
        <Text style={styles.entries}>{t("offerGrid.entries", { count: entries })}</Text>
        <Text style={styles.price}>{money.format(priceCents / 100)}</Text>
        <Pressable style={styles.cta} onPress={() => navigate("/draws/success")}>
          <Text style={styles.ctaText}>{t("draws.cta.confirm")}</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: { width, height: CARD_H },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 28,
    paddingTop: 48,
    paddingBottom: 44,
    alignItems: "center",
  },
  entries: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    opacity: 0.7,
    marginBottom: 8,
  },
  price: {
    color: "#fff",
    fontSize: 52,
    fontWeight: "900",
    lineHeight: 50,
    marginBottom: 28,
  },
  cta: {
    backgroundColor: "#FFDD00",
    borderRadius: 999,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignItems: "center",
  },
  ctaText: {
    color: "#081F28",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 1,
    textTransform: "uppercase",
    textAlign: "center",
  },
});
