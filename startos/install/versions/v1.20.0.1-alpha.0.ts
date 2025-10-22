import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_1_20_0_1 = VersionInfo.of({
  version: '1.20.0:1-alpha.0',
  releaseNotes: `## Updated for StartOS 0.4.0
In this release Alby Hub introduces several new features and improvements:
* Added a new connection wizard to guide users through connecting apps from the app store.
* Introduced CSV export functionality for Alby Hub transactions (both the main transaction list and individual connections/subwallets).
* Enhanced channel purchasing with support for all preferred payment methods (lightning wallet or credit card).
* Added a new search dialog and hotkey to easily navigate to specific pages in the hub.
* Many bug fixes and minor improvements.

View full release details - [here](https://github.com/getAlby/hub/releases/tag/v1.20.0)
`,
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
