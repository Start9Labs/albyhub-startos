import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_22_2_0 = VersionInfo.of({
  version: '1.22.2:0',
  releaseNotes: {
    en_US: 'In this release Alby Hub adds a new AI & Agents page, an integrated on-chain wallet mode, custom user labels for transactions, redesigned settings pages, improved budget selection when creating app connections and support for connecting Alby Hub to Core Lightning (our most requested feature!) plus many other bug fixes and minor improvements.',
  },
  migrations: {
    up: async () => {},
    down: async () => {},
  },
})
