import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { electrumServer } from './setElectrumServer'
import { setupCodeResult } from './showSetupCode'

const { InputSpec, Value, Variants } = sdk

export const inputSpec = InputSpec.of({
  LN_BACKEND_TYPE: Value.union({
    name: i18n('Lightning Implementation'),
    description: i18n(
      "Which Lightning node Alby Hub runs on.\n- LND on this server: the LND service on this server, reached over gRPC. Install and start LND first.\n- Core Lightning on this server: the Core Lightning service on this server, reached over gRPC. Install and start Core Lightning first.\n- phoenixd on this server: the phoenixd service on this server, reached over its HTTP API. Install and start phoenixd first.\n- LDK embedded node: Alby Hub runs its own Lightning node inside this service. It reads the blockchain from the Electrum server you choose (Fulcrum or Electrs on this server, or Alby's), opens inbound channels through Lightning service providers (LSPs), and with a paid Alby account stores channel state on a VSS server run by Alby.\n- Bark embedded Ark wallet (experimental): Alby Hub runs its own Bark wallet, which transacts over the Ark protocol instead of a Lightning node, through Ark and Esplora servers run by Second. Alby Hub marks it as beta.",
    ),
    variants: Variants.of({
      LND: { name: i18n('LND on this server'), spec: InputSpec.of({}) },
      CLN: {
        name: i18n('Core Lightning on this server'),
        spec: InputSpec.of({}),
      },
      PHOENIX: {
        name: i18n('phoenixd on this server'),
        spec: InputSpec.of({}),
      },
      LDK: {
        name: i18n('LDK embedded node'),
        spec: InputSpec.of({ ELECTRUM_SERVER: electrumServer }),
      },
      BARK: {
        name: i18n('Bark embedded Ark wallet (experimental)'),
        spec: InputSpec.of({}),
      },
    }),
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
  async ({ effects, input }) => {
    const { selection, value } = input.LN_BACKEND_TYPE
    await storeJson.merge(effects, {
      LN_BACKEND_TYPE: selection,
      ELECTRUM_SERVER:
        'ELECTRUM_SERVER' in value ? value.ELECTRUM_SERVER : null,
    })
    return setupCodeResult()
  },
)
