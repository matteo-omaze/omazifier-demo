// Metro config so the app can consume the `omazifier` engine, which is a sibling of this
// demo repo (omazifier/ sits next to omazifier-demo/). Mirrors a monorepo sharing a package
// outside the app root, and is also linked via npm workspaces into the root node_modules.
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const engineRoot = path.resolve(projectRoot, "../../omazifier");

const config = getDefaultConfig(projectRoot);

// Watch the engine's source/dist so Metro can bundle it.
config.watchFolders = [engineRoot];

// Resolve app deps first, then fall back to the engine's own node_modules if needed.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(engineRoot, "node_modules"),
];
config.resolver.unstable_enableSymlinks = true;

// PER-MARKET BUNDLE. Each market ships as its own app (mirrors omaze.co.uk / omaze.de as separate
// store apps + EAS channels). MARKET selects which composition the bundle includes; the market-
// agnostic `active-market` import resolves to it BY CONVENTION. Adding a market = drop
// omazifier/markets/market.<code>.ts and bundle with MARKET=<code> — no code edits, and no other
// market's composition enters the bundle.
const MARKET = process.env.MARKET || "uk";
const activeMarket = path.resolve(projectRoot, `omazifier/markets/${MARKET}.ts`);
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "active-market") {
    return { type: "sourceFile", filePath: activeMarket };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
