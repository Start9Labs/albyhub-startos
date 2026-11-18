import { setElectrumServer } from '../actions/setElectrumServer'
import { setLightning } from '../actions/setLightning'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const taskSetLightning = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    await sdk.action.createOwnTask(effects, setLightning, 'critical', {
      reason: i18n('Choose your backend lightning implementation'),
    })
    return
  }
  const store = await storeJson.read().once()
  if (store?.LN_BACKEND_TYPE === 'LDK' && !store.ELECTRUM_SERVER) {
    await sdk.action.createOwnTask(effects, setElectrumServer, 'critical', {
      reason: i18n(
        'Choose the Electrum server the LDK node reads the blockchain from',
      ),
    })
  }
})
