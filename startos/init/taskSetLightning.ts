import { setLightning } from '../actions/setLightning'
import { store } from '../fileModels/store.json'
import { sdk } from '../sdk'

export const taskSetLightning = sdk.setupOnInit(async (effects) => {
  if (!(await store.read((s) => s.LN_BACKEND_TYPE).const(effects))) {
    await sdk.action.createOwnTask(effects, setLightning, 'critical', {
      reason: 'Choose which lightning node Alby Hub will connect to',
    })
  }
})
