import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  LN_BACKEND_TYPE: Value.select({
    name: 'Lightning Implementation',
    description:
      'Choose the Lightning implementation to use with Alby Hub.<br><br><strong>LND on this server</strong>: This option tells Alby Hub to use the LND node installed on this StartOS server. It is the more sovereign and secure option, allowing full control over your node.<br><br><strong>Alby embedded light node</strong>: This option tells Alby Hub to use its own, internal LDK node. This option is convenient but offers less control over your node.',
    values: {
      LND: 'LND on this server',
      LDK: 'LDK embedded node',
    },
    default: 'LND',
  }),
})

export const setLightning = sdk.Action.withInput(
  // id
  'set-lightning',

  // metadata
  async ({ effects }) => {
    const exists = await sdk.store
      .getOwn(effects, sdk.StorePath.LN_BACKEND_TYPE)
      .const()

    return {
      name: 'Set Lightning Implementation',
      description:
        'Choose which lightning node/implementation Alby Hub will use',
      warning: null,
      allowedStatuses: 'only-stopped',
      group: null,
      visibility: exists ? 'hidden' : 'enabled',
    }
  },

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => ({
    LN_BACKEND_TYPE:
      (await sdk.store
        .getOwn(effects, sdk.StorePath.LN_BACKEND_TYPE)
        .const()) || undefined,
  }),

  // the execution function
  async ({ effects, input }) =>
    sdk.store.setOwn(
      effects,
      sdk.StorePath.LN_BACKEND_TYPE,
      input.LN_BACKEND_TYPE,
    ),
)
