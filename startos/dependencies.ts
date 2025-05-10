import { store } from './file-models/store.json'
import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const LN_BACKEND_TYPE = await store
    .read((s) => s.LN_BACKEND_TYPE)
    .const(effects)

  return LN_BACKEND_TYPE === 'LND'
    ? {
        lnd: {
          kind: 'running',
          versionRange: '>=0.18.4:1',
          healthChecks: ['rpc', 'synced'],
        },
      }
    : {}
})
