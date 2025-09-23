import { setupManifest } from '@start9labs/start-sdk'
import { SDKImageInputSpec } from '@start9labs/start-sdk/base/lib/types/ManifestTypes'
import { currentContainer } from './install/versions'

const BUILD = process.env.BUILD || ''

const architectures =
  BUILD === 'x86_64' || BUILD === 'aarch64' ? [BUILD] : ['x86_64', 'aarch64']

export const manifest = setupManifest({
  id: 'albyhub',
  title: 'Alby Hub',
  license: 'Apache-2.0',
  wrapperRepo: 'https://github.com/start9labs/albyhub-startos/',
  upstreamRepo: 'https://github.com/getAlby/hub/',
  supportSite: 'https://github.com/getAlby/hub/issues/',
  marketingSite: 'https://start9.com/',
  donationUrl: 'https://albyhub.com/',
  docsUrl:
    'https://github.com/Start9Labs/albyhub-startos/blob/update/040/docs/README.md',
  description: {
    short: 'Self-custodial Lightning wallet with integrated node',
    long: `Alby Hub is the open-source, self-custodial Lightning wallet that puts you in control. With an integrated node, it's more than just a wallet—it's your gateway to Bitcoin. Manage channels, run apps, and take charge of your funds, all through one sleek, user-friendly interface. Empower your Bitcoin journey with simplicity and sovereignty`,
  },
  volumes: ['main'],
  images: {
    albyhub: {
      source: {
        dockerTag: currentContainer,
      },
      arch: architectures,
    } as SDKImageInputSpec,
  },
  hardwareRequirements: { arch: architectures },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {
    lnd: {
      description: 'Provides a fully sovereign experience',
      optional: true,
      metadata: {
        title: 'Lightning Network Daemon',
        icon: './assets/lnd-icon.png'
      }
    },
  },
})
