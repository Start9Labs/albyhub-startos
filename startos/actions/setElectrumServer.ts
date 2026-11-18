import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

export const electrumServer = Value.select({
  name: i18n('Electrum Server'),
  description: i18n(
    "Where the LDK node reads the blockchain from.\n- Fulcrum or Electrs on this server: your own Electrum server. Install it first; Alby Hub waits until it has finished syncing.\n- Alby's Electrum server: a server run by Alby, which sees your wallet's addresses and transactions.",
  ),
  values: {
    fulcrum: i18n('Fulcrum on this server'),
    electrs: i18n('Electrs on this server'),
    alby: i18n("Alby's Electrum server"),
  },
  default: 'fulcrum',
})

export const setElectrumServer = sdk.Action.withInput(
  'set-electrum-server',

  async ({ effects }) => ({
    name: i18n('Set Electrum Server'),
    description: i18n(
      'Choose the Electrum server the LDK node reads the blockchain from',
    ),
    warning: null,
    allowedStatuses: 'only-stopped',
    group: null,
    visibility:
      (await storeJson.read((s) => s.LN_BACKEND_TYPE).const(effects)) === 'LDK'
        ? 'enabled'
        : 'hidden',
  }),

  InputSpec.of({ ELECTRUM_SERVER: electrumServer }),

  async ({ effects }) => ({
    ELECTRUM_SERVER:
      (await storeJson.read((s) => s.ELECTRUM_SERVER).once()) ?? undefined,
  }),

  async ({ effects, input }) => {
    await storeJson.merge(effects, { ELECTRUM_SERVER: input.ELECTRUM_SERVER })
  },
)
