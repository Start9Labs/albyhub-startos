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
import { readFile } from 'fs/promises'
import { sdk } from './sdk'
import { bridgeAddress, uiPort } from './utils'
import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info(i18n('Starting Alby Hub!'))

  const LN_BACKEND_TYPE = await storeJson.read((s) => s.LN_BACKEND_TYPE).once()

  if (!LN_BACKEND_TYPE) {
    throw new Error(i18n('You must select node type before starting Alby Hub'))
  }

  let env: Record<string, string> = {
    LN_BACKEND_TYPE,
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
    const lndAddress = await bridgeAddress(effects, {
      packageId: 'lnd',
      hostId: lndGrpcHostId,
      internalPort: lndGrpcPort,
    }).const()
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
  } else if (LN_BACKEND_TYPE === 'CLN') {
    // Core Lightning's gRPC over the LXC bridge (replaces `c-lightning.startos:2106`).
    // cln exports only its peer/watchtower ids, so the gRPC host is referenced
    // by literal here.
    const clnAddress = await bridgeAddress(effects, {
      packageId: 'c-lightning',
      hostId: 'grpc',
      internalPort: clnGrpcPort,
    }).const()
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
      CLN_LIGHTNING_DIR: '/mnt/cln/bitcoin',
      ENABLE_ADVANCED_SETUP: 'false',
    }

    mounts = mounts.mountDependency<typeof clnManifest>({
      dependencyId: 'c-lightning',
      volumeId: 'main',
      subpath: null,
      mountpoint: '/mnt/cln',
      readonly: true,
    })
  } else if (LN_BACKEND_TYPE === 'PHOENIX') {
    // phoenixd's HTTP API over the LXC bridge (replaces `phoenixd.startos:9740`).
    const phoenixdAddress = await bridgeAddress(effects, {
      packageId: 'phoenixd',
      hostId: phoenixdApiHostId,
      internalPort: phoenixdPort,
    }).const()
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
      volumeId: 'main',
      subpath: null,
      mountpoint: '/mnt/phoenixd',
      readonly: true,
    })
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
  return sdk.Daemons.of(effects).addDaemon('primary', {
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
    requires: [],
  })
})

async function readPhoenixdHttpPassword(rootfs: string): Promise<string> {
  const conf = await readFile(`${rootfs}/mnt/phoenixd/phoenix.conf`, 'utf-8')
  const password = conf.match(/^http-password=(.*)$/m)?.[1]?.trim()
  if (!password) {
    throw new Error(i18n('Could not read the phoenixd http-password'))
  }
  return password
}
