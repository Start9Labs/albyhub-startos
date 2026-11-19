import { manifest as lndManifest } from 'lnd-startos/startos/manifest'
import { manifest as clnManifest } from 'cln-startos/startos/manifest'
import { manifest as phoenixdManifest } from 'phoenixd-startos/startos/manifest'
import {
  gRPCHostId as lndGrpcHostId,
  gRPCPort as lndGrpcPort,
} from 'lnd-startos/startos/interfaces'
import { grpcPort as clnGrpcPort } from 'cln-startos/startos/utils'
import { apiHostId as phoenixdApiHostId } from 'phoenixd-startos/startos/interfaces'
import { port as phoenixdPort } from 'phoenixd-startos/startos/utils'
import {
  electrumPort as fulcrumPort,
  mainHostId as fulcrumHostId,
} from 'fulcrum-startos/startos/utils'
import {
  electrumHostId as electrsHostId,
  port as electrsPort,
} from 'electrs-startos/startos/utils'
import { readFile } from 'fs/promises'
import { sdk } from './sdk'
import { dependencies } from './dependencies'
import { uiPort } from './utils'
import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info(i18n('Starting Alby Hub!'))

  const { LN_BACKEND_TYPE, ELECTRUM_SERVER, SETUP_CODE, SETUP_COMPLETED } =
    (await storeJson.read().once()) ?? {}

  if (!LN_BACKEND_TYPE) {
    throw new Error(i18n('You must select node type before starting Alby Hub'))
  }
  if (!SETUP_CODE) {
    throw new Error(i18n('The setup code is missing'))
  }

  let env: Record<string, string> = {
    LN_BACKEND_TYPE,
    SETUP_CODE,
    WORK_DIR: '/data',
    HIDE_UPDATE_BANNER: 'true',
  }

  let mounts = sdk.Mounts.of().mountVolume({
    volumeId: 'main',
    subpath: null,
    mountpoint: '/data',
    readonly: false,
  })

  if (LN_BACKEND_TYPE === 'LND') {
    // LND's gRPC over the LXC bridge (replaces the old `lnd.startos:10009` DNS);
    // LND's StartOS-issued cert covers the bridge address, read via the mount.
    const lndAddress = await sdk.host
      .getBridgeAddress(effects, {
        packageId: 'lnd',
        hostId: lndGrpcHostId,
        internalPort: lndGrpcPort,
      })
      .const()
    if (!lndAddress) {
      throw new Error(
        i18n(
          'LND is not yet reachable on the internal network. Ensure LND is installed and running.',
        ),
      )
    }

    env = {
      ...env,
      LND_ADDRESS: lndAddress,
      LND_CERT_FILE: '/mnt/lnd/tls.cert',
      LND_MACAROON_FILE: '/mnt/lnd/admin.macaroon',
      ENABLE_ADVANCED_SETUP: 'false',
    }

    mounts = mounts.mountDependency<typeof lndManifest>({
      dependencyId: 'lnd',
      volumeId: 'public',
      subpath: 'admin',
      mountpoint: '/mnt/lnd',
      readonly: true,
    })
  } else if (LN_BACKEND_TYPE === 'CLN') {
    // Core Lightning's gRPC over the LXC bridge (replaces `c-lightning.startos:2106`).
    // cln exports only its peer/watchtower ids, so the gRPC host is referenced
    // by literal here.
    const clnAddress = await sdk.host
      .getBridgeAddress(effects, {
        packageId: 'c-lightning',
        hostId: 'grpc',
        internalPort: clnGrpcPort,
      })
      .const()
    if (!clnAddress) {
      throw new Error(
        i18n(
          'Core Lightning is not yet reachable on the internal network. Ensure Core Lightning is installed and running.',
        ),
      )
    }

    env = {
      ...env,
      CLN_ADDRESS: clnAddress,
      CLN_LIGHTNING_DIR: '/mnt/cln',
      ENABLE_ADVANCED_SETUP: 'false',
    }

    mounts = mounts.mountDependency<typeof clnManifest>({
      dependencyId: 'c-lightning',
      volumeId: 'public',
      subpath: 'grpc',
      mountpoint: '/mnt/cln',
      readonly: true,
    })
  } else if (LN_BACKEND_TYPE === 'PHOENIX') {
    // phoenixd's HTTP API over the LXC bridge (replaces `phoenixd.startos:9740`).
    const phoenixdAddress = await sdk.host
      .getBridgeAddress(effects, {
        packageId: 'phoenixd',
        hostId: phoenixdApiHostId,
        internalPort: phoenixdPort,
        ssl: false,
      })
      .const()
    if (!phoenixdAddress) {
      throw new Error(
        i18n(
          'phoenixd is not yet reachable on the internal network. Ensure phoenixd is installed and running.',
        ),
      )
    }

    env = {
      ...env,
      PHOENIXD_ADDRESS: `http://${phoenixdAddress}`,
      ENABLE_ADVANCED_SETUP: 'false',
    }

    mounts = mounts.mountDependency<typeof phoenixdManifest>({
      dependencyId: 'phoenixd',
      volumeId: 'public',
      subpath: 'full',
      mountpoint: '/mnt/phoenixd',
      readonly: true,
    })
  } else if (LN_BACKEND_TYPE === 'LDK') {
    if (!ELECTRUM_SERVER) {
      throw new Error(
        i18n('You must choose an Electrum server before starting Alby Hub'),
      )
    }
    if (ELECTRUM_SERVER !== 'alby') {
      const { packageId, hostId, internalPort, unreachable } =
        ELECTRUM_SERVER === 'fulcrum'
          ? {
              packageId: 'fulcrum',
              hostId: fulcrumHostId,
              internalPort: fulcrumPort,
              unreachable: i18n(
                'Fulcrum is not yet reachable on the internal network. Ensure Fulcrum is installed and running.',
              ),
            }
          : {
              packageId: 'electrs',
              hostId: electrsHostId,
              internalPort: electrsPort,
              unreachable: i18n(
                'Electrs is not yet reachable on the internal network. Ensure Electrs is installed and running.',
              ),
            }
      const electrumAddress = await sdk.host
        .getBridgeAddress(effects, {
          packageId,
          hostId,
          internalPort,
          ssl: false,
        })
        .const()
      if (!electrumAddress) throw new Error(unreachable)

      env = { ...env, LDK_ELECTRUM_SERVER: `tcp://${electrumAddress}` }
    }
  }

  const subcontainer = sdk.SubContainer.of(
    effects,
    { imageId: 'albyhub' },
    mounts,
    'albyhub-sub',
  )

  if (LN_BACKEND_TYPE === 'PHOENIX') {
    const rootfs = await subcontainer.rootfs
    env.PHOENIXD_AUTHORIZATION = await readPhoenixdHttpPassword(rootfs)
  }

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */
  // Local backend readiness gates the process, not upstream wallet unlock.
  // A restarted wallet needs its password unless Auto Unlock is enabled.
  // LND/CLN can briefly report "syncing" after a new block.
  const backendReady = async () =>
    (await dependencies.check(effects)).satisfied()
  let wasReady = false
  const daemons = sdk.Daemons.of(effects)
    .addHealthCheck('backend-readiness', {
      ready: {
        display: i18n('Backend Readiness'),
        fn: async () => {
          let ready = await backendReady()
          if (!ready && wasReady) {
            await new Promise((resolve) => setTimeout(resolve, 35_000))
            ready = await backendReady()
          }
          wasReady = ready
          return ready
            ? { result: 'success', message: null }
            : {
                result: 'loading',
                waiting: true,
                message: i18n(
                  'Waiting for the selected local backend to be ready',
                ),
              }
        },
      },
      requires: [],
    })
    .addDaemon('primary', {
      subcontainer,
      exec: { command: sdk.useEntrypoint(), env, runAsInit: true },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is unreachable'),
          }),
      },
      requires: ['backend-readiness'],
    })
  if (SETUP_COMPLETED) return daemons

  let setupCompleted = false
  return daemons.addHealthCheck('setup-completed', {
    ready: {
      display: null,
      fn: async () => {
        if (
          !setupCompleted &&
          (await fetch(`http://127.0.0.1:${uiPort}/api/info`)
            .then((r) => r.json())
            .then((info) => info.setupCompleted === true)
            .catch(() => false))
        ) {
          await storeJson.merge(effects, { SETUP_COMPLETED: true })
          setupCompleted = true
        }
        return { result: 'success', message: null }
      },
    },
    requires: ['primary'],
  })
})

async function readPhoenixdHttpPassword(rootfs: string): Promise<string> {
  const password = (
    await readFile(`${rootfs}/mnt/phoenixd/http-password`, 'utf-8')
  ).trim()
  if (!password) {
    throw new Error(i18n('Could not read the phoenixd http-password'))
  }
  return password
}
