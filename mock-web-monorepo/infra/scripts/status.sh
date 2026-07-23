#!/usr/bin/env bash
# Usage: bash infra/scripts/status.sh [shared|markets|all]
# Shows the deployment state of the shared stack, SSM parameters, and market stacks.
set -euo pipefail

SCOPE=${1:-all}
APP_REGION=${AWS_REGION:-eu-west-2}
US_EAST_1=us-east-1
SSM_PREFIX=/omazifier

check_stack() {
  local name=$1 region=$2
  aws cloudformation describe-stacks \
    --stack-name "$name" \
    --region "$region" \
    --query 'Stacks[0].StackStatus' \
    --output text 2>/dev/null || echo "NOT DEPLOYED"
}

if [[ $SCOPE == "shared" || $SCOPE == "all" ]]; then
  echo "=== Shared Stack (us-east-1) ==="
  STATUS=$(check_stack omazifier-shared $US_EAST_1)
  echo "  omazifier-shared: $STATUS"

  echo ""
  echo "=== SSM Parameters (us-east-1) ==="
  aws ssm get-parameters-by-path \
    --path "$SSM_PREFIX" \
    --region $US_EAST_1 \
    --query 'Parameters[].{Name:Name,Value:Value}' \
    --output table 2>/dev/null || echo "  No parameters found — shared stack not yet deployed"
fi

if [[ $SCOPE == "markets" || $SCOPE == "all" ]]; then
  echo ""
  echo "=== Market Stacks ($APP_REGION) ==="
  # Read market IDs from market_deployments.ts without executing TypeScript
  MARKETS=$(grep -oP '(?<=id: '"'"')[^'"'"']+' "$(dirname "$0")/../market_deployments.ts" 2>/dev/null || echo "uk de fr")
  for market in $MARKETS; do
    STATUS=$(check_stack "omazifier-$market" $APP_REGION)
    echo "  $market: $STATUS"
  done

  echo ""
  echo "=== CloudFront Distributions ($APP_REGION) ==="
  aws cloudfront list-distributions \
    --query "DistributionList.Items[?starts_with(Origins.Items[0].Id,'omazifier')].{Domain:DomainName,Status:Status,Aliases:Aliases.Items[0]}" \
    --output table 2>/dev/null || echo "  None found"
fi
