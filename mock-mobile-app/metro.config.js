// Metro config for the omazifier demo workspace.
//
// Layout:
//   feat/omazifier/
//     omazifier/          ← engine (engineRoot)
//     omazifier-demo/     ← workspace root (workspaceRoot)
//       mock-mobile-app/  ← this file (projectRoot)
//
// omazifier is linked into workspaceRoot/node_modules/omazifier via npm workspaces.
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "..");
const engineRoot = path.resolve(projectRoot, "../../omazifier");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot, engineRoot];

// Workspace node_modules first so hoisted packages win over any project-local leftovers.
config.resolver.nodeModulesPaths = [
  path.resolve(workspaceRoot, "node_modules"),
  path.resolve(projectRoot, "node_modules"),
];
config.resolver.unstable_enableSymlinks = true;

// Pin React to a single physical path via resolveRequest (extraNodeModules is fallback-only
// and won't override a local node_modules/react that already exists).
const REACT_ROOT = path.dirname(
  require.resolve("react/package.json", { paths: [workspaceRoot] })
);

// Market is selected at runtime per-simulator via NSUserDefaults (see active-market-runtime.ts).
const activeMarket = path.resolve(projectRoot, "active-market-runtime.ts");

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "active-market") {
    return { type: "sourceFile", filePath: activeMarket };
  }
  // Force every react import (including jsx-runtime) to the single workspace copy.
  // Without this, Metro resolves react from each importing file's nearest node_modules,
  // which causes two React instances → "Invalid hook call" crash.
  if (moduleName === "react") {
    return { type: "sourceFile", filePath: path.join(REACT_ROOT, "index.js") };
  }
  if (moduleName === "react/jsx-runtime") {
    return { type: "sourceFile", filePath: path.join(REACT_ROOT, "jsx-runtime.js") };
  }
  if (moduleName === "react/jsx-dev-runtime") {
    return { type: "sourceFile", filePath: path.join(REACT_ROOT, "jsx-dev-runtime.js") };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
