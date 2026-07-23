#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { MARKETS } from '../../market_deployments'
import { SharedStack } from '../infra/shared-stack'

const app = new cdk.App()

const accountId = process.env.AWS_ACCOUNT_ID
if (!accountId) throw new Error('AWS_ACCOUNT_ID env var is required')

// SharedStack MUST deploy to us-east-1: CloudFront requires ACM certs and
// CLOUDFRONT-scope WAF WebACLs to live there. ARNs are written to SSM and
// read by the market stacks at synth time.
new SharedStack(app, 'OmazifierShared', {
  stackName: 'omazifier-shared',
  env: { account: accountId, region: 'us-east-1' },
  markets: MARKETS,
  ssmPrefix: '/omazifier',
})
