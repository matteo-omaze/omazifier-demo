import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));

// PER-MARKET BUILD TARGET. Each market is its own deployable — mirrors offers-uk / offers-de being
// separate Nx apps, each built and shipped independently. MARKET picks which composition the build
// includes; each market writes its own output dir, so rebuilding one never touches another.
const MARKET = process.env.MARKET ?? "uk";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  distDir: `dist/${MARKET}`,
  webpack(config) {
    // Resolve the market-agnostic `active-market` import to the selected market's file BY CONVENTION.
    // Adding a market = drop omazifier/markets/<code>.ts and build with MARKET=<code> — no code
    // edits, and <other>.ts never enters this build's module graph (no cross-market bloat).
    config.resolve.alias["active-market"] = path.resolve(dir, `omazifier/markets/${MARKET}.ts`);
    return config;
  },
};

export default nextConfig;
