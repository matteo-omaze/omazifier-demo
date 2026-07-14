import { View, Text, Pressable, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { useTranslation } from "../contexts/i18n";
import { useNav } from "../contexts/nav";
import type { HeroConfig } from "./schemas";

const { width } = Dimensions.get("window");
const CARD_HEIGHT = width * 1.55;


export function Hero({ config }: { config: HeroConfig }) {
  const { t } = useTranslation();
  const { navigate } = useNav();

  const primaryLink = config.primaryCtaLabelId
    ? config.links.find((l) => l.labelId === config.primaryCtaLabelId)
    : config.links[0];
  const secondaryLinks = config.links.filter((l) => l !== primaryLink);

  const imageContent = (
    <>
      {/* Large heading at the top */}
      <Text style={styles.heading}>{t("hero.heading")}</Text>

      <View style={{ flex: 1 }} />

      {/* Bottom row: large italic sub on left, compact pill on right */}
      <View style={styles.bottomRow}>
        <Text style={styles.headingSub}>{t("hero.headingSub")}</Text>
        {primaryLink && (
          <Pressable style={styles.ctaPill} onPress={() => navigate(primaryLink.to)}>
            <Text style={styles.ctaPillText}>{t("hero.cta")}</Text>
          </Pressable>
        )}
      </View>
      <View style={{ height: 28 }} />
    </>
  );

  const secondaryNav = secondaryLinks.length > 0 ? (
    <View style={styles.secondaryNav}>
      {secondaryLinks.map((link) => (
        <Pressable key={link.to} onPress={() => navigate(link.to)}>
          <Text style={styles.secondaryLinkText}>{t(link.labelId)}</Text>
        </Pressable>
      ))}
    </View>
  ) : null;

  if (config.imageUrl) {
    return (
      <View>
        <ImageBackground
          source={{ uri: config.imageUrl }}
          style={[styles.card, { height: CARD_HEIGHT }]}
          imageStyle={styles.image}
          resizeMode="cover"
        >
          {imageContent}
        </ImageBackground>
        {secondaryNav}
      </View>
    );
  }

  return (
    <View>
      <View style={[styles.card, styles.fallback, { height: CARD_HEIGHT * 0.7 }]}>
        {imageContent}
      </View>
      {secondaryNav}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { overflow: "hidden", marginBottom: 0 },
  image: {},
  fallback: { backgroundColor: "#081F28" },
  // Large bold heading at top of hero
  heading: {
    color: "#FFDD00",
    fontSize: 58,
    fontWeight: "900",
    lineHeight: 54,
    textTransform: "uppercase",
    paddingHorizontal: 20,
    paddingTop: 30,
    textShadowColor: "rgba(0,0,0,0.55)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
  },
  // Sub flows normally; pill is absolutely positioned on top of it
  bottomRow: {
    position: "relative",
    paddingHorizontal: 20,
  },
  headingSub: {
    color: "#FEFBF6",
    fontSize: 60,
    fontWeight: "800",
    fontStyle: "italic",
    lineHeight: 60,
    textAlign: "right",
    textShadowColor: "rgba(0,0,0,0.45)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
    marginBottom: -20,
    marginRight: 30,
  },
  ctaPill: {
    alignSelf: "flex-end",
    marginTop: 12,
    backgroundColor: "#FFDD00",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  ctaPillText: {
    color: "#081F28",
    fontWeight: "900",
    fontSize: 13,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  secondaryNav: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 28,
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  secondaryLinkText: {
    color: "rgba(254,251,246,0.65)",
    fontSize: 13,
    fontWeight: "600",
  },
});
