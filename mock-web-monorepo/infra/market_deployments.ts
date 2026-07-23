/**
 * Single source of truth for per-market deployment config.
 * Consumed by infra/bin/app.ts to create one CDK stack per market.
 *
 * Adding a market: add an entry here, drop omazifier/markets/<id>.ts,
 * obtain an ACM cert + Route 53 hosted zone for the domain, then deploy.
 */

export interface MarketDeployment {
  readonly id: string
  readonly domainName: string
  readonly hostedZoneId: string
  readonly hostedZoneName: string
}

export const MARKETS: readonly MarketDeployment[] = [
  {
    id: 'uk',
    domainName: 'omazifier-uk.stg.omaze.co.uk',
    hostedZoneId: 'Z00042491R41B4YUZI85R',
    hostedZoneName: 'stg.omaze.co.uk',
  },
]
