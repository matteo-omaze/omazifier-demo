import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));

// PER-MARKET BUILD TARGET. Each market is its own deployable — mirrors offers-uk / offers-de being
// separate Nx apps, each built and shipped independently. MARKET picks which composition the build
// includes; each market writes its own output dir, so rebuilding one never touches another.
const MARKET = process.env.MARKET ?? "uk";

// open-next build sets NEXT_PRIVATE_STANDALONE and needs to read from .next/.
// Skip the custom distDir when building for Lambda so open-next can find the output.
const distDir = process.env.NO_DIST_DIR === '1' ? '.next' : `dist/${MARKET}`

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  distDir,
  webpack(config) {
    // Resolve the market-agnostic `active-market` import to the selected market's file BY CONVENTION.
    // Adding a market = drop omazifier/markets/<code>.ts and build with MARKET=<code> — no code
    // edits, and <other>.ts never enters this build's module graph (no cross-market bloat).
    config.resolve.alias["active-market"] = path.resolve(dir, `omazifier/markets/${MARKET}.ts`);
    config.resolve.alias["active-registry"] = process.env.PRUNED === '1'
      ? path.resolve(dir, 'omazifier/registry.pruned.ts')
      : path.resolve(dir, 'omazifier/registry.ts');
    return config;
  },
};

export default nextConfig;
