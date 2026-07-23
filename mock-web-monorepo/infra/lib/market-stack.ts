import * as cdk from 'aws-cdk-lib'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets'
import { Nextjs } from 'cdk-nextjs-standalone'
import type { Construct } from 'constructs'
import type { MarketDeployment } from '../market_deployments'

export interface MarketStackProps extends cdk.StackProps {
  readonly market: MarketDeployment
  readonly certArn: string
  readonly wafAclArn: string
}

export class MarketStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: MarketStackProps) {
    super(scope, id, props)
    const { market } = props

    const zone = route53.HostedZone.fromHostedZoneAttributes(this, 'Zone', {
      hostedZoneId: market.hostedZoneId,
      zoneName: market.hostedZoneName,
    })

    // nextjsPath: '.' — cdk.json lives at the mock-web-monorepo root, so CDK's
    // CWD is mock-web-monorepo/, which is also where open-next.config.ts and
    // .open-next/ land after `open-next build`. Deploy markets one at a time:
    // each infra:deploy:<market> script rebuilds .open-next/ before calling CDK.
    //
    // All URL routing (/offers, /draws, /entry…) is handled by the Next.js
    // [[...slug]] catch-all — no per-route CloudFront behaviours are needed here.
    const nextjsApp = new Nextjs(this, 'App', {
      nextjsPath: '.',
      skipBuild: true,
      environment: {
        BFF_URL: process.env.BFF_URL ?? '',
      },
    })

    // nextjsApp.distribution is NextjsDistribution (the construct wrapper).
    // .distribution.distribution is the underlying cloudfront.Distribution L2.
    const cfDist = nextjsApp.distribution.distribution
    const cfnDist = cfDist.node.defaultChild as cloudfront.CfnDistribution

    // Attach custom domain, ACM cert, and WAF via L1 property overrides —
    // the cdk-nextjs-standalone construct doesn't expose these as typed props.
    cfnDist.addPropertyOverride('DistributionConfig.Aliases', [market.domainName])
    cfnDist.addPropertyOverride('DistributionConfig.ViewerCertificate', {
      AcmCertificateArn: props.certArn,
      SslSupportMethod: 'sni-only',
      MinimumProtocolVersion: 'TLSv1.2_2021',
    })
    cfnDist.addPropertyOverride('DistributionConfig.WebACLId', props.wafAclArn)

    new route53.ARecord(this, 'AliasRecord', {
      zone,
      recordName: market.domainName,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(cfDist)
      ),
    })

    cdk.Tags.of(this).add('service', `omazifier-${market.id}`)
    cdk.Tags.of(this).add('market', market.id)
  }
}
