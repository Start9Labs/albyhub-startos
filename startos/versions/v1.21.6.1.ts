import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readdir, rename, rm, stat } from 'fs/promises'
import { join } from 'path'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'

export const v_1_21_6_1 = VersionInfo.of({
  version: '1.21.6:1',
  releaseNotes: {
    en_US: 'Fix data migration from StartOS 0.3.5.1',
    es_ES: 'Corrección de migración de datos desde StartOS 0.3.5.1',
    de_DE: 'Datenmigration von StartOS 0.3.5.1 behoben',
    pl_PL: 'Naprawiono migrację danych z StartOS 0.3.5.1',
    fr_FR: 'Correction de la migration des données depuis StartOS 0.3.5.1',
  },
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml: { lightning?: 'lnd' | 'alby' } | undefined =
        await sdk.volumes.main
          .readFile('start9/config.yaml')
          .then((c) => c.toString('utf-8'))
          .then(YAML.parse, () => undefined)

      if (configYaml) {
        await storeJson.write(effects, {
          LN_BACKEND_TYPE: configYaml.lightning === 'alby' ? 'LDK' : 'LND',
        })

        // remove old start9 dir
        await rm(sdk.volumes.main.subpath('start9'), {
          recursive: true,
        })
      } else {
        const ldkExists = await stat(sdk.volumes.main.subpath('albyhub/ldk'))
          .then((s) => s.isDirectory())
          .catch(() => false)
        if (ldkExists) {
          await storeJson.write(effects, {
            LN_BACKEND_TYPE: 'LDK',
          })
        }
      }

      // migrate data from old WORK_DIR (/data/albyhub) to new WORK_DIR (/data)
      const oldDataDir = sdk.volumes.main.subpath('albyhub')
      const oldDataExists = await stat(oldDataDir)
        .then((s) => s.isDirectory())
        .catch(() => false)

      if (oldDataExists) {
        const entries = await readdir(oldDataDir)
        for (const entry of entries) {
          const target = sdk.volumes.main.subpath(entry)
          await rm(target, { recursive: true, force: true })
          await rename(join(oldDataDir, entry), target)
        }
        await rm(oldDataDir, { recursive: true })
      }
    },
    down: IMPOSSIBLE,
  },
})
