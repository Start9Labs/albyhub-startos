import { sdk } from './sdk'
import { exposedStore } from './store'
import { setDependencies } from './dependencies'
import { setInterfaces } from './interfaces'
import { versions } from './versions'
import { actions } from './actions'
import { setLightning } from './actions/setLightning'

// **** Install ****
const install = sdk.setupInstall(async ({ effects }) => {
  await sdk.store.setOwn(effects, sdk.StorePath, { LN_BACKEND_TYPE: null })
  await sdk.action.requestOwn(effects, setLightning, 'critical', {
    reason: 'Choose which lightning node Alby Hub will connect to',
  })
})

// **** Uninstall ****
const uninstall = sdk.setupUninstall(async ({ effects }) => {})

/**
 * Plumbing. DO NOT EDIT.
 */
export const { packageInit, packageUninit, containerInit } = sdk.setupInit(
  versions,
  install,
  uninstall,
  setInterfaces,
  setDependencies,
  actions,
  exposedStore,
)
