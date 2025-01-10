import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  implementation: Value.select({
    name: 'Lightning Implementation',
    description:
      'Choose the Lightning implementation to use with Alby Hub.<br><br><strong>LND on this server</strong>: This option tells Alby Hub to use the LND node installed on this StartOS server. It is the more sovereign and secure option, allowing full control over your node.<br><br><strong>Alby embedded light node</strong>: This option tells Alby Hub to use its own, built-in light node. This option is convenient but offers less control over your node.',
    values: {
      lnd: 'LND on this server',
      ldk: 'Alby Hub embedded node',
    },
    default: 'lnd',
  }),
})

export const setLightning = sdk.Action.withInput(
  // id
  'set-lightning',

  // metadata
  async ({ effects }) => ({
    name: 'Set Lightning Implementation',
    description: 'Choose which lightning node/implementation Alby Hub will use',
    warning: null,
    allowedStatuses: 'only-stopped',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => ({
    implementation: await sdk.store
      .getOwn(effects, sdk.StorePath.implementation)
      .const(),
  }),

  // the execution function
  async ({ effects, input }) =>
    sdk.store.setOwn(
      effects,
      sdk.StorePath.implementation,
      input.implementation,
    ),
)
