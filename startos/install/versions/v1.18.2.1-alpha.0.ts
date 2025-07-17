import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_1_18_2_1 = VersionInfo.of({
  version: '1.18.2:1-alpha.0',
  releaseNotes: `## Updated for StartOS 0.4.0
This is a HUGE Alby Hub release with many new features!
* Receive via **BOLT 12 offers**
* Integrated **one-off swaps**
* **Channel rebalancing** (beta)
* **Lightning addresses** for sub-wallets
* New apps in the app store
* And much more!

View full release details - [here](https://github.com/getAlby/hub/releases/tag/v1.18.2)
`,
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
