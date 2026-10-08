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
        dockerTag: 'ghcr.io/getalby/hub:v1.24.1',
      },
      arch: ['x86_64', 'aarch64'],
      emulateMissing: false,
    },
  },
})
