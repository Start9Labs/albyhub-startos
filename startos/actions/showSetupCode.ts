import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const setupCodeResult = async () => ({
  version: '1' as const,
  title: i18n('Setup Code'),
  message: i18n(
    'Alby Hub asks for this code in its Web UI before first-time setup or restoring an Alby Hub backup.',
  ),
  result: {
    type: 'single' as const,
    value: (await storeJson.read((s) => s.SETUP_CODE).once()) ?? '',
    copyable: true,
    qr: false,
    masked: true,
    launchable: false,
  },
})

export const showSetupCode = sdk.Action.withoutInput(
  'show-setup-code',

  async ({ effects }) => ({
    name: i18n('Show Setup Code'),
    description: i18n(
      'Show the code Alby Hub asks for before first-time setup or restoring an Alby Hub backup',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: (await storeJson.read((s) => s.SETUP_COMPLETED).const(effects))
      ? 'hidden'
      : 'enabled',
  }),

  setupCodeResult,
)
