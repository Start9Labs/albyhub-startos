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
  docsUrls: ['https://guides.getalby.com/user-guide/'],
  description: { short, long },
  volumes: ['main', 'startos'],
  images: {
    albyhub: {
      source: {
        dockerTag: 'ghcr.io/getalby/hub:v1.21.6',
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
  },
})
