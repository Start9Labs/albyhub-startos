import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const implementation = await sdk.store
    .getOwn(effects, sdk.StorePath.LN_BACKEND_TYPE)
    .const()

  if (implementation === 'LDK') return {}

  return {
    lnd: {
      kind: 'running',
      versionRange: '>=0.18.4:1',
      healthChecks: ['rpc', 'synced'],
    },
  }
})
