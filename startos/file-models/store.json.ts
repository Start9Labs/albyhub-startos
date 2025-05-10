import { matches, FileHelper } from '@start9labs/start-sdk'

const { object, oneOf, literal } = matches

const shape = object({
  LN_BACKEND_TYPE: oneOf(literal('LND'), literal('LDK'))
    .nullable()
    .onMismatch(null),
})

export const store = FileHelper.json(
  { volumeId: 'main', subpath: '/store.json' },
  shape,
)
