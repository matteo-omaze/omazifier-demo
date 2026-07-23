import * as cdk from 'aws-cdk-lib'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as ssm from 'aws-cdk-lib/aws-ssm'
import * as wafv2 from 'aws-cdk-lib/aws-wafv2'
import type { Construct } from 'constructs'
import type { MarketDeployment } from '../../market_deployments'

export interface SharedStackProps extends cdk.StackProps {
  readonly markets: readonly MarketDeployment[]
  readonly ssmPrefix: string
}

export class SharedStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: SharedStackProps) {
    super(scope, id, props)

    // One WAF WebACL shared across all market CloudFront distributions.
    // Must live in us-east-1 — CloudFront only accepts CLOUDFRONT-scope WAFs from that region.
    const webAcl = new wafv2.CfnWebACL(this, 'WafWebAcl', {
      scope: 'CLOUDFRONT',
      defaultAction: { allow: {} },
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: 'omazifier-web',
        sampledRequestsEnabled: true,
      },
      rules: [
        {
          name: 'CommonRuleSet',
          priority: 1,
          overrideAction: { none: {} },
          statement: {
            managedRuleGroupStatement: { vendorName: 'AWS', name: 'AWSManagedRulesCommonRuleSet' },
          },
          visibilityConfig: {
            cloudWatchMetricsEnabled: true,
            metricName: 'omazifier-common-rules',
            sampledRequestsEnabled: true,
          },
        },
      ],
    })

    new ssm.StringParameter(this, 'WafAclArnParam', {
      parameterName: `${props.ssmPrefix}/waf-acl-arn`,
      stringValue: webAcl.attrArn,
      tier: ssm.ParameterTier.STANDARD,
    })

    // One ACM certificate per market — must be DNS-validated against the market's hosted zone,
    // and must live in us-east-1 (CloudFront requirement).
    for (const market of props.markets) {
      const zone = route53.HostedZone.fromHostedZoneAttributes(this, `Zone-${market.id}`, {
        hostedZoneId: market.hostedZoneId,
        zoneName: market.hostedZoneName,
      })

      const cert = new acm.Certificate(this, `Cert-${market.id}`, {
        domainName: market.domainName,
        validation: acm.CertificateValidation.fromDns(zone),
      })

      new ssm.StringParameter(this, `CertArnParam-${market.id}`, {
        parameterName: `${props.ssmPrefix}/cert-arn/${market.id}`,
        stringValue: cert.certificateArn,
        tier: ssm.ParameterTier.STANDARD,
      })
    }
  }
}
