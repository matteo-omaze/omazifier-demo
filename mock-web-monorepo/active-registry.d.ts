// Type for the market-specific `active-registry` import. The concrete file is resolved at build
// time by a webpack alias (see next.config.mjs): in dev it points to registry.ts (full), in
// pruned builds to registry.pruned.ts (codegen output containing only this market's blocks).
declare module "active-registry" {
  import type { Registry } from "omazifier";
  export const registry: Registry<any>;
}
