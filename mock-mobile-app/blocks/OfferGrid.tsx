import { View, Text, StyleSheet, Pressable, ImageBackground, Dimensions, ScrollView } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useState, useRef } from "react";
import { useNav } from "../contexts/nav";
import type { Market } from "omazifier";
import { useTranslation } from "../contexts/i18n";
import type { OfferGridConfig } from "./schemas";

type Campaign = { id: string; imageUrl: string; tagKey: string; headingKey: string; ctaLabelKey: string; ctaPath: string };
type Offer = { id: string; entries: number; price: number; wasPrice: number | null; ribbon: string | null; checkoutUrl: string };
type OffersData = { campaigns?: Campaign[]; offers: Offer[] };

const { width } = Dimensions.get("window");

const HALF_W = width / 2;

const CTA_H = 50;
const R_CTA = (CTA_H * CTA_H + HALF_W * HALF_W) / (2 * CTA_H);
const CTA_SLICE = `M 0,${CTA_H} A ${R_CTA},${R_CTA} 0 0 1 ${width},${CTA_H} Z`;

const ARCH_S = 50;
const R_ARCH = (ARCH_S * ARCH_S + HALF_W * HALF_W) / (2 * ARCH_S);
const BANNER_ARCH = `M 0,${ARCH_S} A ${R_ARCH},${R_ARCH} 0 0 1 ${width},${ARCH_S} L ${width},0 L 0,0 Z`;

export function OfferGrid({ data }: { config: OfferGridConfig; data: { offers?: OffersData }; market: Market }) {
  const { t } = useTranslation();
  const { navigate } = useNav();
  const payload = data.offers;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  if (!payload) return null;

  const campaigns = payload.campaigns ?? [];

  const scrollToIndex = (i: number) => {
    const next = (i + campaigns.length) % campaigns.length;
    scrollRef.current?.scrollTo({ x: next * width, animated: true });
    setActiveIndex(next);
  };

  return (
    <View style={styles.wrap}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / width));
        }}
      >
        {campaigns.map((c) => (
          <View key={c.id} style={{ width }}>
            <ImageBackground
              source={{ uri: c.imageUrl }}
              style={styles.campaignCard}
              imageStyle={styles.campaignImage}
              resizeMode="cover"
            >
              <View style={styles.topBanner}>
                <Text style={styles.bannerHeading}>{t(c.headingKey)}</Text>
              </View>
              <Svg width={width} height={ARCH_S} viewBox={`0 0 ${width} ${ARCH_S}`}>
                <Path d={BANNER_ARCH} fill="#FFDD00" />
              </Svg>

              <View style={{ flex: 1 }} />

              <Pressable style={styles.ctaWrap} onPress={() => navigate(c.ctaPath, { imageUrl: c.imageUrl })}>
                <Svg
                  width={width}
                  height={CTA_H}
                  viewBox={`0 0 ${width} ${CTA_H}`}
                  style={StyleSheet.absoluteFillObject}
                >
                  <Path d={CTA_SLICE} fill="#FEFBF6" />
                </Svg>
                <View style={styles.ctaLabel}>
                  <Text style={styles.ctaText}>{t(c.ctaLabelKey)}</Text>
                </View>
              </Pressable>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>

      <View style={styles.controls}>
        <Pressable style={styles.arrow} onPress={() => scrollToIndex(activeIndex - 1)}>
          <Text style={styles.arrowText}>‹</Text>
        </Pressable>
        {campaigns.length > 1 && (
          <View style={styles.dots}>
            {campaigns.map((_, i) => (
              <Pressable key={i} onPress={() => scrollToIndex(i)}>
                <View style={[styles.dot, i === activeIndex && styles.dotActive]} />
              </Pressable>
            ))}
          </View>
        )}
        <Pressable style={styles.arrow} onPress={() => scrollToIndex(activeIndex + 1)}>
          <Text style={styles.arrowText}>›</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 0 },
  campaignCard: {
    height: width * 1.1,
    overflow: "hidden",
  },
  campaignImage: {},
  topBanner: {
    backgroundColor: "#FFDD00",
    paddingTop: 22,
    paddingBottom: 8,
    alignItems: "center",
  },
  bannerHeading: {
    color: "#081F28",
    fontSize: 26,
    fontWeight: "900",
    lineHeight: 24,
    textTransform: "uppercase",
    textAlign: "center",
  },
  ctaWrap: {
    height: CTA_H,
    overflow: "hidden",
  },
  ctaLabel: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  ctaText: {
    color: "#081F28",
    fontWeight: "800",
    fontSize: 17,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#081F28",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  arrow: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  arrowText: {
    color: "#FFDD00",
    fontSize: 32,
    lineHeight: 36,
    fontWeight: "300",
  },
  dots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,221,0,0.3)",
  },
  dotActive: {
    backgroundColor: "#FFDD00",
  },
});
