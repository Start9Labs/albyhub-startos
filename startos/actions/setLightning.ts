import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  LN_BACKEND_TYPE: Value.select({
    name: i18n('Lightning Implementation'),
    description: i18n(
      'Which Lightning node Alby Hub runs on.\n- LND on this server: the LND service on this server, reached over gRPC. Install and start LND first.\n- Core Lightning on this server: the Core Lightning service on this server, reached over gRPC. Install and start Core Lightning first.\n- phoenixd on this server: the phoenixd service on this server, reached over its HTTP API. Install and start phoenixd first.\n- LDK embedded node: Alby Hub runs its own Lightning node inside this service; no other service on this server is needed.\n- Bark embedded Ark wallet (experimental): Alby Hub runs its own Bark wallet, which transacts over the Ark protocol instead of a Lightning node, through Ark and Esplora servers run by Second. Alby Hub marks it as beta.',
    ),
    values: {
      LND: i18n('LND on this server'),
      CLN: i18n('Core Lightning on this server'),
      PHOENIX: i18n('phoenixd on this server'),
      LDK: i18n('LDK embedded node'),
      BARK: i18n('Bark embedded Ark wallet (experimental)'),
    },
    default: null,
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
