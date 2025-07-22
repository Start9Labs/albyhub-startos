import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_1_18_3_1 = VersionInfo.of({
  version: '1.18.3:1-alpha.0',
  releaseNotes: `## Updated for StartOS 0.4.0
### Hotfix 1.18.3
In this hotfix we make a few improvements to the newly released swaps feature.
We update the LDK dependency which includes improvements to multi-path payments.
We also speed up the new background task to delete excess events.

View full release details - [here](https://github.com/getAlby/hub/releases/tag/v1.18.3)
`,
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
