import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'albyhub',
  title: 'Alby Hub',
  license: 'Apache-2.0',
  packageRepo: 'https://github.com/Start9Labs/albyhub-startos',
  upstreamRepo: 'https://github.com/getAlby/hub/',
  marketingUrl: 'https://albyhub.com/',
  donationUrl: 'https://getalby.com/donate',
  description: { short, long },
  volumes: ['main', 'startos'],
  images: {
    albyhub: {
      source: {
        dockerTag: 'ghcr.io/getalby/hub:v1.24.0',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {
    lnd: {
      description: 'Provides a fully sovereign experience',
      optional: true,
      metadata: {
        title: 'LND',
        icon: 'https://raw.githubusercontent.com/Start9Labs/lnd-startos/f17336a10769efd8782a347662848c50c6270349/icon.svg',
      },
    },
    'c-lightning': {
      description: 'Provides a fully sovereign experience',
      optional: true,
      metadata: {
        title: 'Core Lightning',
        icon: 'https://raw.githubusercontent.com/Start9Labs/cln-startos/71b2d1eb78e2d31cc4d62a410512422d39e856e9/icon.svg',
      },
    },
    phoenixd: {
      description: 'Provides a minimal, automated Lightning node',
      optional: true,
      metadata: {
        title: 'phoenixd',
        icon: 'https://raw.githubusercontent.com/Start9-Community/phoenixd-startos/d95b7028e6578bd5ec0ee1eb70a945232da00961/icon.svg',
      },
    },
  },
})
