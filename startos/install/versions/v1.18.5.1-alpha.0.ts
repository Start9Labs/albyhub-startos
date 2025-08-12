import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_1_18_5_1 = VersionInfo.of({
  version: '1.18.5:1-alpha.0',
  releaseNotes: `## Updated for StartOS 0.4.0
### Hotfix 1.18.5
In this hotfix we make a few improvements and bug fixes:
* App pagination is added, improving the performance for hubs with many apps.
* Fixed an issue where Alby Hub would ignore the shutdown signal and not gracefully shut down.
* Addressed a password change bug where HTTP requests are unauthorized until Alby Hub is fully restarted.
* Added a button to migrate standard isolated connections to sub-wallets.
* Included Wave.space in the app store.

View full release details - [here](https://github.com/getAlby/hub/releases/tag/v1.18.5)
`,
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
