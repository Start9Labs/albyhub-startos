import { matches, FileHelper } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const { object, oneOf, literal } = matches

const shape = object({
  LN_BACKEND_TYPE: oneOf(literal('LND'), literal('LDK'))
    .nullable()
    .onMismatch(null),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.startos, subpath: './store.json' },
  shape,
)
