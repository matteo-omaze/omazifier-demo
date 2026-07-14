import { Settings } from "react-native";
import uk from "./omazifier/markets/uk";
import de from "./omazifier/markets/de";
import fr from "./omazifier/markets/fr";

const MARKETS = { uk, de, fr } as const;
type Key = keyof typeof MARKETS;

// Market is written to NSUserDefaults by dev-ios.sh via:
//   xcrun simctl spawn <UDID> defaults write com.anonymous.omazifier-mobile activeMarket <uk|de>
// Settings.get is synchronous, so this is safe to evaluate at module load time.
const key = (Settings.get("activeMarket") as Key) || "uk";
export default MARKETS[key] ?? MARKETS.uk;
