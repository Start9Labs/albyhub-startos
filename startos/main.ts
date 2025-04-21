import { sdk } from './sdk'
import { T } from '@start9labs/start-sdk'
import { manifest as lndManifest } from 'lnd-startos/startos/manifest'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects, started }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info('Starting Alby Hub!')

  const depResult = await sdk.checkDependencies(effects)
  depResult.throwIfNotSatisfied()

  const LN_BACKEND_TYPE = (await sdk.store
    .getOwn(effects, sdk.StorePath.LN_BACKEND_TYPE)
    .once())!

  let env: Record<string, string> = {
    LN_BACKEND_TYPE,
    WORK_DIR: '/data/albyhub', // @TODO Aiden does this need to be set at LXC container scope?
    PORT: String(uiPort),
    LOG_EVENTS: 'true',
  }

  let mounts = sdk.Mounts.of().addVolume('main', null, '/data', false)

  if (LN_BACKEND_TYPE === 'LND') {
    const lndgrpc = await sdk.serviceInterface
      .get(effects, {
        id: 'grpc',
        packageId: 'lnd',
      })
      .const()

    env = {
      // @TODO Aiden how to get LND GRPC port?
      LND_ADDRESS: `lnd.startos:${lndgrpc?.addressInfo?.internalPort || '10009'}`,
      LND_CERT_FILE: '/mnt/lnd/tls.cert',
      LND_MACAROON_FILE: '/mnt/lnd/admin.macaroon',
      ENABLE_ADVANCED_SETUP: 'false',
      ...env,
    }

    mounts = mounts.addDependency<typeof lndManifest>(
      'lnd',
      'main',
      null,
      '/lnd',
      true,
    )
  }

  /**
   * ======================== Additional Health Checks (optional) ========================
   *
   * In this section, we define *additional* health checks beyond those included with each daemon (below).
   */
  const healthReceipts: T.HealthCheck[] = []

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */
  return sdk.Daemons.of(effects, started, healthReceipts).addDaemon('primary', {
    subcontainer: await sdk.SubContainer.of(
      effects,
      { imageId: 'albyhub' },
      mounts,
      'albyhub-sub',
    ),
    command: ['main'],
    env,
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
