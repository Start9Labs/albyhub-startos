import { actions } from '../actions'
import { restoreInit } from '../backups'
import { dependencies } from '../dependencies'
import { versionGraph } from '../versions'
import { setInterfaces } from '../interfaces'
import { sdk } from '../sdk'
import { seedSetupCode } from './seedSetupCode'
import { taskSetLightning } from './taskSetLightning'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  setInterfaces,
  actions,
  dependencies,
  seedSetupCode,
  taskSetLightning,
)

export const uninit = sdk.setupUninit(versionGraph)
