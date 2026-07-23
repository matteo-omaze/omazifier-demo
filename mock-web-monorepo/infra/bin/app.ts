#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { execSync } from 'child_process'
import { MARKETS } from '../market_deployments'
import { MarketStack } from '../lib/market-stack'

const app = new cdk.App()

const accountId = process.env.AWS_ACCOUNT_ID
const region = process.env.AWS_REGION ?? 'eu-west-2'

if (!accountId) {
  throw new Error('AWS_ACCOUNT_ID env var is required')
}

function ssmParam(name: string, awsRegion: string): string {
  try {
    return execSync(
      `aws ssm get-parameter --name "${name}" --region ${awsRegion} --query "Parameter.Value" --output text`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
    ).trim()
  } catch {
    // SharedStack not yet deployed. cdk ls / cdk bootstrap can proceed with a
    // placeholder; cdk deploy will fail at CloudFormation if the value is wrong.
    return `PENDING_${name.replaceAll('/', '_').toUpperCase()}`
  }
}

// WAF WebACL is shared across markets — created once via SharedStack and stored
// in SSM. Must live in us-east-1 (CloudFront requirement).
const wafAclArn = ssmParam('/omazifier/waf-acl-arn', 'us-east-1')

for (const market of MARKETS) {
  // Each market has its own ACM cert (domain-specific), also stored in SSM.
  const certArn = ssmParam(`/omazifier/cert-arn/${market.id}`, 'us-east-1')

  new MarketStack(app, `Omazifier-${market.id.toUpperCase()}`, {
    stackName: `omazifier-${market.id}`,
    env: { account: accountId, region },
    market,
    certArn,
    wafAclArn,
  })
}
