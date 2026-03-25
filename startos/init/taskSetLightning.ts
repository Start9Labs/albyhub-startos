import { setLightning } from '../actions/setLightning'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const taskSetLightning = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    await sdk.action.createOwnTask(effects, setLightning, 'critical', {
      reason: i18n('Choose your backend lightning implementation'),
    })
  }
})
