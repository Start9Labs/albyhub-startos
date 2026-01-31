import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { storeJson } from '../../fileModels/store.json'

export const v_1_21_4_0_b0 = VersionInfo.of({
  version: '1.21.4:0-beta.0',
  releaseNotes: {
    en_US: 'Updated for StartOS 0.4.0',
    es_ES: 'Actualizado para StartOS 0.4.0',
    de_DE: 'Aktualisiert für StartOS 0.4.0',
    pl_PL: 'Zaktualizowano dla StartOS 0.4.0',
    fr_FR: 'Mis à jour pour StartOS 0.4.0',
  },
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml: { lightning?: 'lnd' | 'ldk' } | undefined =
        await readFile(
          '/media/startos/volumes/main/start9/config.yaml',
          'utf-8',
        ).then(YAML.parse, () => undefined)

      if (configYaml) {
        await storeJson.write(effects, {
          LN_BACKEND_TYPE: configYaml.lightning === 'ldk' ? 'LDK' : 'LND',
        })

        // remove old start9 dir
        await rm('/media/startos/volumes/main/start9', {
          recursive: true,
        })
      }
    },
    down: IMPOSSIBLE,
  },
})
