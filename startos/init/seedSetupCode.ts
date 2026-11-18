import { utils } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'

export const seedSetupCode = sdk.setupOnInit(async (effects) => {
  if (await storeJson.read((s) => s.SETUP_CODE).once()) return
  await storeJson.merge(effects, {
    SETUP_CODE: utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len: 16 }),
  })
})
