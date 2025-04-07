import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_1_16_0_0 = VersionInfo.of({
  version: '1.16.0:0',
  releaseNotes: 'Some new stuff',
  migrations: {
    up: async ({ effects }) => {
      console.log('TESTING AN ** UP ** MIGRATON')
    },
    down: async ({ effects }) => {
      console.log('TESTING AN ** UP ** MIGRATON')
    },
  },
})
