import { storeJson } from './fileModels/store.json'
import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const LN_BACKEND_TYPE = await storeJson
    .read((s) => s.LN_BACKEND_TYPE)
    .const(effects)

  return LN_BACKEND_TYPE === 'LND'
    ? {
        lnd: {
          kind: 'running',
          versionRange: '^0.20.0-beta:1-beta.1',
          healthChecks: ['primary', 'sync-progress'],
        },
      }
    : {}
})
