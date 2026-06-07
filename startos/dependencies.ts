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
        versionRange: '^0.20.1-beta:2',
        healthChecks: ['lnd', 'sync-progress'],
      },
    }
  }

  if (LN_BACKEND_TYPE === 'CLN') {
    return {
      'c-lightning': {
        kind: 'running',
        versionRange: '>=26.6:0',
        healthChecks: ['lightningd', 'check-synced'],
      },
    }
  }

  if (LN_BACKEND_TYPE === 'PHOENIX') {
    return {
      phoenixd: {
        kind: 'running',
        versionRange: '>=0.7.3:3',
        healthChecks: ['primary'],
      },
    }
  }

  return {}
})
