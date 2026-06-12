import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  LN_BACKEND_TYPE: Value.select({
    name: i18n('Lightning Implementation'),
    description: i18n(
      'Choose the Lightning implementation to use with Alby Hub.<br><br><strong>LND on this server</strong>: This option tells Alby Hub to use the LND node installed on this StartOS server. It is the more sovereign and secure option, allowing full control over your node.<br><br><strong>Core Lightning on this server</strong>: This option tells Alby Hub to use the Core Lightning node installed on this StartOS server, connecting over gRPC.<br><br><strong>phoenixd on this server</strong>: This option tells Alby Hub to use the phoenixd node installed on this StartOS server, connecting over its HTTP API. phoenixd is a minimal, automated Lightning node.<br><br><strong>Alby embedded light node</strong>: This option tells Alby Hub to use its own, internal LDK node. This option is convenient but offers less control over your node.<br><br><strong>Bark embedded Ark wallet (experimental)</strong>: This option tells Alby Hub to use its own, internal Bark wallet, which transacts over the Ark protocol instead of a Lightning node. It relies on Ark and Esplora servers hosted by Second, and is experimental.',
    ),
    values: {
      LND: i18n('LND on this server'),
      CLN: i18n('Core Lightning on this server'),
      PHOENIX: i18n('phoenixd on this server'),
      LDK: i18n('LDK embedded node'),
      BARK: i18n('Bark embedded Ark wallet (experimental)'),
    },
    default: 'LND',
  }),
})

export const setLightning = sdk.Action.withInput(
  // id
  'set-lightning',

  // metadata
  async ({ effects }) => {
    return {
      name: i18n('Set Lightning Implementation'),
      description: i18n(
        'Choose which lightning node/implementation Alby Hub will use',
      ),
      warning: i18n('This cannot be changed later'),
      allowedStatuses: 'only-stopped',
      group: null,
      visibility: 'hidden',
    }
  },

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => {},

  // the execution function
  async ({ effects, input }) =>
    storeJson.write(effects, { LN_BACKEND_TYPE: input.LN_BACKEND_TYPE }),
)
