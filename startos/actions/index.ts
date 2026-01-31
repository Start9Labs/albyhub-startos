import { sdk } from '../sdk'
import { setLightning } from './setLightning'

export const actions = sdk.Actions.of().addAction(setLightning)
