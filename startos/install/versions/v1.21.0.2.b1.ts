import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { load } from 'js-yaml'
import { storeJson } from '../../fileModels/store.json'

export const v_1_21_0_2_b1 = VersionInfo.of({
  version: '1.21.0:2-beta.1',
  releaseNotes: 'Updated for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml = load(
        await readFile(
          '/media/startos/volumes/main/start9/config.yaml',
          'utf-8',
        ),
      ) as { lightning?: 'lnd' | 'ldk' } | undefined

      if (configYaml?.lightning) {
        await storeJson.write(effects, {
          LN_BACKEND_TYPE: configYaml.lightning === 'ldk' ? 'LDK' : 'LND',
        })
      }

      // remove old start9 dir
      await rm('/media/startos/volumes/main/start9', { recursive: true }).catch(
        console.error,
      )
    },
    down: IMPOSSIBLE,
  },
})
