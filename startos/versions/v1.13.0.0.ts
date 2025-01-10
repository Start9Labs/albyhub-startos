import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { readFile, rmdir } from 'fs/promises'
import { load } from 'js-yaml'
import { sdk } from '../sdk'

export const v_1_13_0_0 = VersionInfo.of({
  version: '1.13.0:0',
  releaseNotes: 'Updated for StartOS 0.3.6',
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml = load(
        await readFile('/root/start9/config.yaml', 'utf-8'),
      ) as { lightning: 'lnd' | 'ldk' }

      await sdk.store.setOwn(
        effects,
        sdk.StorePath.implementation,
        configYaml.lightning,
      )

      // remove old start9 dir
      await rmdir('/root/start9')
    },
    down: IMPOSSIBLE,
  },
})
