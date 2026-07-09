// Metro config for the omazifier demo workspace.
//
// Layout:
//   feat/omazifier/
//     omazifier/          ← engine (engineRoot)
//     omazifier-demo/     ← workspace root (workspaceRoot)
//       mock-mobile-app/  ← this file (projectRoot)
//
// omazifier is linked into workspaceRoot/node_modules/omazifier via npm workspaces.
// nodeModulesPaths must point at the hoisted workspace node_modules — NOT the engine's own
// node_modules — so React resolves to a single copy and hooks don't break.
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "..");
const engineRoot = path.resolve(projectRoot, "../../omazifier");

const config = getDefaultConfig(projectRoot);

// Watch workspace root (for all packages) and engine source (for hot reload on engine edits).
config.watchFolders = [workspaceRoot, engineRoot];

// Hoisted workspace node_modules first, then project-local. Never the engine's own
// node_modules — that's what was causing the duplicate-React hooks error.
config.resolver.nodeModulesPaths = [
  path.resolve(workspaceRoot, "node_modules"),
  path.resolve(projectRoot, "node_modules"),
];
config.resolver.unstable_enableSymlinks = true;

// PER-MARKET BUNDLE. MARKET env var selects which composition file the bundle includes.
// Adding a market = drop omazifier/markets/<code>.ts, no code edits needed.
const MARKET = process.env.MARKET || "uk";
const activeMarket = path.resolve(projectRoot, `omazifier/markets/${MARKET}.ts`);
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "active-market") {
    return { type: "sourceFile", filePath: activeMarket };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
