#!/usr/bin/env bash
set -euo pipefail

DEFAULT_TIMEOUT=15

# Check Xcode is installed
if ! xcode-select -p &>/dev/null; then
  echo "Xcode is not installed. Download it from the App Store or https://developer.apple.com/xcode/" >&2
  exit 1
fi

if ! command -v xcrun &>/dev/null; then
  echo "xcrun not found — Xcode command-line tools may be incomplete." >&2
  exit 1
fi

# Check if a simulator is already booted
BOOTED=$(xcrun simctl list devices booted 2>/dev/null | grep -v "^==" | grep -v "^--" | grep "(Booted)" || true)
if [[ -n "$BOOTED" ]]; then
  echo "Simulator already running:"
  echo "$BOOTED"
  exit 0
fi

# List available simulators (iOS only, available state)
SIMULATORS=()
while IFS= read -r line; do
  SIMULATORS+=("$line")
done < <(
  xcrun simctl list devices available 2>/dev/null \
    | grep -E "^\s+.+ \([0-9A-F-]{36}\) \(Shutdown\)" \
    | sed 's/^ *//' \
    | grep -v "^--"
)

if [[ ${#SIMULATORS[@]} -eq 0 ]]; then
  echo "No available simulators found. Open Xcode → Settings → Platforms to install one." >&2
  exit 1
fi

echo ""
echo "Available simulators:"
for i in "${!SIMULATORS[@]}"; do
  printf "  [%d] %s\n" "$((i + 1))" "${SIMULATORS[$i]}"
done

DEFAULT_IDX=0
DEFAULT_NAME="${SIMULATORS[$DEFAULT_IDX]}"

echo ""
echo "Pick a simulator [1-${#SIMULATORS[@]}] (default: 1 — ${DEFAULT_NAME} — in ${DEFAULT_TIMEOUT}s):"

CHOSEN=""
if read -r -t "$DEFAULT_TIMEOUT" CHOSEN_RAW 2>/dev/null; then
  CHOSEN="$CHOSEN_RAW"
fi

if [[ -z "$CHOSEN" ]]; then
  echo "(No input — using default)"
  CHOSEN="1"
fi

if ! [[ "$CHOSEN" =~ ^[0-9]+$ ]] || (( CHOSEN < 1 || CHOSEN > ${#SIMULATORS[@]} )); then
  echo "Invalid selection '$CHOSEN', using default." >&2
  CHOSEN="1"
fi

SELECTED="${SIMULATORS[$((CHOSEN - 1))]}"
UDID=$(echo "$SELECTED" | grep -oE '[0-9A-F-]{36}')

if [[ -z "$UDID" ]]; then
  echo "Could not extract UDID from: $SELECTED" >&2
  exit 1
fi

echo ""
echo "Booting: $SELECTED"
xcrun simctl boot "$UDID"
open -a Simulator
echo "Done — simulator is booting."
