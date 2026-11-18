import { sdk } from '../sdk'
import { setElectrumServer } from './setElectrumServer'
import { setLightning } from './setLightning'
import { showSetupCode } from './showSetupCode'

export const actions = sdk.Actions.of()
  .addAction(setLightning)
  .addAction(setElectrumServer)
  .addAction(showSetupCode)
