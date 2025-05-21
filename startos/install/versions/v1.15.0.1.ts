import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { readFile, rmdir } from 'fs/promises'
import { load } from 'js-yaml'
import { store } from '../../fileModels/store.json'

export const v_1_15_0_1 = VersionInfo.of({
  version: '1.15.0:1',
  releaseNotes: 'Updated for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml = load(
        await readFile('/data/start9/config.yaml', 'utf-8'),
      ) as { lightning?: 'lnd' | 'ldk' } | undefined

      const LN_BACKEND_TYPE = configYaml?.lightning === 'ldk' ? 'LDK' : 'LND'

      await store.write(effects, { LN_BACKEND_TYPE })

      // remove old start9 dir
      await rmdir('/data/start9')
    },
    down: IMPOSSIBLE,
  },
})
