import { storeJson } from './fileModels/store.json'
import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const LN_BACKEND_TYPE = await storeJson
    .read((s) => s.LN_BACKEND_TYPE)
    .const(effects)

  if (LN_BACKEND_TYPE === 'LND') {
    return {
      lnd: {
        kind: 'running',
        versionRange: '>=0.21.1-beta:4',
        healthChecks: ['lnd', 'sync-progress'],
      },
    }
  }

  if (LN_BACKEND_TYPE === 'CLN') {
    return {
      'c-lightning': {
        kind: 'running',
        // 26.6.7:4 is the first revision Alby Hub can reach: a StartOS TLS
        // listener (<=26.6.7:2) refuses the `cln` server name it must send on
        // StartOS 0.4.0.2+, and 26.6.7:3 forwarded the port but bound cln-grpc
        // to an address the plugin cannot parse.
        versionRange: '>=26.6.7:4',
        healthChecks: ['lightningd', 'check-synced'],
      },
    }
  }

  if (LN_BACKEND_TYPE === 'PHOENIX') {
    return {
      phoenixd: {
        kind: 'running',
        versionRange: '>=0.8.0:1',
        healthChecks: ['primary'],
      },
    }
  }

  return {}
})
