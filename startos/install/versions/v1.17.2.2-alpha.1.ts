import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_1_17_2_2 = VersionInfo.of({
  version: '1.17.2:2-alpha.1',
  releaseNotes: 'Updated for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
