import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_1_21_0_1 = VersionInfo.of({
  version: '1.21.0:1-alpha.2',
  releaseNotes: `\
## Updated for StartOS 0.4.0

### Dependency Updates
* Updated SDK to beta.44
* Updated interface name for backwards compatibility
* Updated dev dependencies to latest versions

View full release details - [here](https://github.com/getAlby/hub/releases/tag/v1.21.0)
`,
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
