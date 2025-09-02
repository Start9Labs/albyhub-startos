import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_1_19_3_1 = VersionInfo.of({
  version: '1.19.3:1-alpha.0',
  releaseNotes: `## Updated for StartOS 0.4.0
In this release Alby Hub introduces several new features and improvements:
* Added on-chain and swaps support to the wallet send and receive pages.
* Redesigned the app store for a better user experience.
* Added routing statistics to the homepage.
* Introduced auto-swap to xpub.
* Improved the first channel flow with support to pay by credit card.
* Fixed links that incorrectly opened the connections page on the app store tab instead of the connections tab.
* Many bug fixes and minor improvements.

View full release details - [here](https://github.com/getAlby/hub/releases/tag/v1.19.3)
`,
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
