#!/usr/bin/env bash
set -euo pipefail

MARKET="${MARKET:-uk}"
BUNDLE_ID="com.anonymous.omazifier-mobile"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$SCRIPT_DIR/../mock-mobile-app"

# Per-market Metro port — each market runs its own bundler, mirroring how web works.
case "$MARKET" in
  uk) PORT=8081 ;;
  de) PORT=8082 ;;
  fr) PORT=8083 ;;
  *)  echo "Unknown market: $MARKET. Add a PORT entry for it in dev-ios.sh."; exit 1 ;;
esac

# ── Simulator allocation ─────────────────────────────────────────────────────
CLAIM_DIR="/tmp/omazifier-sims"
mkdir -p "$CLAIM_DIR"
CLAIM_FILE="$CLAIM_DIR/$MARKET"

TARGET_UDID=""

if [[ -f "$CLAIM_FILE" ]]; then
  SAVED=$(cat "$CLAIM_FILE")
  STATE=$(xcrun simctl list devices -j 2>/dev/null \
    | python3 -c "
import json,sys
d=json.load(sys.stdin)
for devs in d['devices'].values():
  for dev in devs:
    if dev['udid']=='$SAVED':
      print(dev['state']); exit()
" 2>/dev/null || true)
  if [[ "$STATE" == "Booted" ]]; then
    TARGET_UDID="$SAVED"
  else
    rm -f "$CLAIM_FILE"
  fi
fi

if [[ -z "$TARGET_UDID" ]]; then
  CLAIMED_BY_OTHERS=""
  for f in "$CLAIM_DIR"/*; do
    [[ -f "$f" && "$(basename "$f")" != "$MARKET" ]] && CLAIMED_BY_OTHERS="$CLAIMED_BY_OTHERS $(cat "$f")"
  done

  TARGET_UDID=$(xcrun simctl list devices available -j 2>/dev/null \
    | python3 -c "
import json,sys
claimed=set('$CLAIMED_BY_OTHERS'.split())
d=json.load(sys.stdin)
for runtime,devs in d['devices'].items():
  if 'iOS' not in runtime: continue
  for dev in devs:
    if dev['state']=='Booted' and dev['udid'] not in claimed and 'iPhone' in dev['name']:
      print(dev['udid']); exit()
" 2>/dev/null || true)

  if [[ -z "$TARGET_UDID" ]]; then
    TARGET_UDID=$(xcrun simctl list devices available -j 2>/dev/null \
      | python3 -c "
import json,sys,re
claimed=set('$CLAIMED_BY_OTHERS'.split())
d=json.load(sys.stdin)
order=[r'iPhone 17\$','iPhone Air','iPhone 17e','iPhone 17 Pro Max','iPhone 17 Pro']
devs_flat=[(dev,rt) for rt,devs in d['devices'].items() if 'iOS' in rt for dev in devs
           if dev['state']=='Shutdown' and 'iPhone' in dev['name'] and dev['udid'] not in claimed]
for pattern in order:
  for dev,_ in devs_flat:
    if re.search(pattern,dev['name']): print(dev['udid']); exit()
for dev,_ in devs_flat:
  print(dev['udid']); exit()
" 2>/dev/null || true)

    if [[ -z "$TARGET_UDID" ]]; then
      echo "No available iPhone simulator for market '$MARKET'. Open Xcode → Settings → Platforms."
      exit 1
    fi

    echo "Booting simulator for market '$MARKET'…"
    xcrun simctl boot "$TARGET_UDID"
    open -a Simulator
    sleep 3
  fi

  echo "$TARGET_UDID" > "$CLAIM_FILE"
  SIM_NAME=$(xcrun simctl list devices -j 2>/dev/null \
    | python3 -c "
import json,sys
d=json.load(sys.stdin)
for devs in d['devices'].values():
  for dev in devs:
    if dev['udid']=='$TARGET_UDID': print(dev['name']); exit()
" 2>/dev/null || echo "$TARGET_UDID")
  echo "Using simulator: $SIM_NAME ($TARGET_UDID) for market '$MARKET'"
fi

# Write the active market to NSUserDefaults so Settings.get("activeMarket") returns it.
xcrun simctl spawn "$TARGET_UDID" defaults write "$BUNDLE_ID" activeMarket "$MARKET" 2>/dev/null || true

# Each market gets its own DerivedData directory to prevent build.db lock contention when
# multiple markets are built concurrently. Expo 54 doesn't expose -derivedDataPath, so we
# intercept xcodebuild via a PATH wrapper that prepends the flag transparently.
DERIVED_DATA="$HOME/Library/Developer/Xcode/DerivedData/omazifier-$MARKET"
WRAPPER_DIR="/tmp/omazifier-xcodebuild-$MARKET"
mkdir -p "$WRAPPER_DIR"
printf '#!/bin/bash\nexec /usr/bin/xcodebuild -derivedDataPath "%s" "$@"\n' "$DERIVED_DATA" > "$WRAPPER_DIR/xcodebuild"
chmod +x "$WRAPPER_DIR/xcodebuild"

cd "$APP_DIR"
export PATH="$WRAPPER_DIR:$(gem environment gemdir)/bin:$PATH"
exec env expo run:ios --port "$PORT" --device "$TARGET_UDID"
