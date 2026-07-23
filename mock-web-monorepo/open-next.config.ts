export default {
  // Prune the component registry for the target market, then build.
  // NO_DIST_DIR=1 keeps the output at .next/ (not dist/<market>/) so that
  // open-next can find the standalone bundle it expects at .next/standalone/.
  buildCommand: 'npm run prune-registry && PRUNED=1 NO_DIST_DIR=1 npm run build',
  default: {},
}
