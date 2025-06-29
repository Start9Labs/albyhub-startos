import { setLightning } from './actions/setLightning'
import { store } from './fileModels/store.json'
import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const LN_BACKEND_TYPE = await store
    .read((s) => s.LN_BACKEND_TYPE)
    .const(effects)

  if (!LN_BACKEND_TYPE) {
    await sdk.action.createOwnTask(effects, setLightning, 'critical', {
      reason: 'Choose which lightning node Alby Hub will connect to',
    })
  }

  return LN_BACKEND_TYPE === 'LND'
    ? {
        lnd: {
          kind: 'running',
          versionRange: '>=0.18.4:1',
          healthChecks: ['primary', 'sync-progress'],
        },
      }
    : {}
})
