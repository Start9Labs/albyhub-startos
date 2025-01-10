import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const implementation = await sdk.store
    .getOwn(effects, sdk.StorePath.implementation)
    .const()

  if (implementation === 'ldk') return {}

  return {
    lnd: {
      kind: 'running',
      versionRange: '>=0.18.4:1',
      healthChecks: ['rpc', 'synced'],
    },
  }
})
