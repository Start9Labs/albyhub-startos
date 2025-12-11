import { sdk } from './sdk'
import { manifest as lndManifest } from 'lnd-startos/startos/manifest'
import { uiPort } from './utils'
import { storeJson } from './fileModels/store.json'

export const main = sdk.setupMain(async ({ effects, started }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info('Starting Alby Hub!')

  const LN_BACKEND_TYPE = await storeJson.read((s) => s.LN_BACKEND_TYPE).once()

  if (!LN_BACKEND_TYPE) {
    throw new Error('You must select node type before starting Alby Hub')
  }

  let env: Record<string, string> = {
    LN_BACKEND_TYPE,
    // WORK_DIR: '/data/albyhub',
    // PORT: String(uiPort),
    // @TODO seems like LOG_EVENTS may have been renamed to SEND_EVENTS_TO_ALBY
    // LOG_EVENTS: 'false',
    // SEND_EVENTS_TO_ALBY: 'false',
  }

  let mounts = sdk.Mounts.of().mountVolume({
    volumeId: 'main',
    subpath: null,
    mountpoint: '/data',
    readonly: false,
  })

  if (LN_BACKEND_TYPE === 'LND') {
    env = {
      ...env,
      LND_ADDRESS: 'lnd.startos:10009',
      LND_CERT_FILE: '/mnt/lnd/tls.cert',
      LND_MACAROON_FILE: '/mnt/lnd/data/chain/bitcoin/mainnet/admin.macaroon',
      ENABLE_ADVANCED_SETUP: 'false',
    }

    mounts = mounts.mountDependency<typeof lndManifest>({
      dependencyId: 'lnd',
      volumeId: 'main',
      subpath: null,
      mountpoint: '/mnt/lnd',
      readonly: true,
    })
  }

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */
  return sdk.Daemons.of(effects, started).addDaemon('primary', {
    subcontainer: await sdk.SubContainer.of(
      effects,
      { imageId: 'albyhub' },
      mounts,
      'albyhub-sub',
    ),
    exec: { command: sdk.useEntrypoint(), env },
    ready: {
      display: 'Web Interface',
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: 'The web interface is ready',
          errorMessage: 'The web interface is unreachable',
        }),
    },
    requires: [],
  })
})
