import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const LN_BACKEND_TYPE = await sdk.store
    .getOwn(effects, sdk.StorePath.LN_BACKEND_TYPE)
    .const()

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
