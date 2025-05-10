import { sdk } from './sdk'
import { setDependencies } from './dependencies'
import { setInterfaces } from './interfaces'
import { versions } from './versions'
import { actions } from './actions'
import { setLightning } from './actions/setLightning'
import { store } from './file-models/store.json'

// **** PreInstall ****
const preInstall = sdk.setupPreInstall(async ({ effects }) => {
  store.write(effects, { LN_BACKEND_TYPE: null })
})

// **** PostInstall ****
const postInstall = sdk.setupPostInstall(async ({ effects }) => {
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
  preInstall,
  postInstall,
  uninstall,
  setInterfaces,
  setDependencies,
  actions,
)
