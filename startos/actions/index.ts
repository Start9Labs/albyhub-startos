import { sdk } from '../sdk'
import { setLightning } from './setLightning'
import { showSetupCode } from './showSetupCode'

export const actions = sdk.Actions.of()
  .addAction(setLightning)
  .addAction(showSetupCode)
