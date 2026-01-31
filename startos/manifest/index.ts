import { setupManifest } from '@start9labs/start-sdk'
import { short, long } from './i18n'

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
  description: { short, long },
  volumes: ['main', 'startos'],
  images: {
    albyhub: {
      source: {
        dockerTag: 'ghcr.io/getalby/hub:v1.21.4',
      },
    },
  },
  dependencies: {
    lnd: {
      description: 'Provides a fully sovereign experience',
      optional: true,
      metadata: {
        title: 'Lightning Network Daemon',
        icon: './assets/lnd-icon.png',
      },
    },
  },
})
