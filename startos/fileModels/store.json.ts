import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.looseObject({
  LN_BACKEND_TYPE: z
    .enum(['LND', 'LDK', 'CLN', 'PHOENIX', 'BARK'])
    .nullable()
    .catch(null),
  ELECTRUM_SERVER: z
    .enum(['fulcrum', 'electrs', 'alby'])
    .nullable()
    .catch(null),
  SETUP_CODE: z.string().nullable().catch(null),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.startos, subpath: './store.json' },
  shape,
)
