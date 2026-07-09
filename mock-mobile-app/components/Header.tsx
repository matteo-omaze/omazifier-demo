import { View, Text, Pressable, StyleSheet } from "react-native";

// App CHROME (not an omazifier block): the same header on every route. Brand taps go home. The
// market is fixed for this bundle (one build = one market), so it's shown as a static badge — no
// switcher (a DE user has the DE app).
export function Header({ market, onHome }: { market: string; onHome: () => void }) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onHome}>
        <Text style={styles.wordmark}>OMAZE</Text>
      </Pressable>
      <Text style={styles.market}>{market.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#221943", paddingHorizontal: 20, paddingVertical: 14,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
  },
  wordmark: { color: "#fff", fontWeight: "800", letterSpacing: 2 },
  market: {
    color: "#fff", fontWeight: "700", fontSize: 13,
    backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 999,
    paddingHorizontal: 14, paddingVertical: 6, overflow: "hidden",
  },
});
