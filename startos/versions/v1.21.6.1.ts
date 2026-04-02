import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, readdir, rename, rm, stat } from 'fs/promises'
import { join } from 'path'
import { storeJson } from '../fileModels/store.json'

const MAIN_VOL = '/media/startos/volumes/main'

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
      const configYaml: { lightning?: 'lnd' | 'ldk' } | undefined =
        await readFile(
          join(MAIN_VOL, 'start9/config.yaml'),
          'utf-8',
        ).then(YAML.parse, () => undefined)

      if (configYaml) {
        await storeJson.write(effects, {
          LN_BACKEND_TYPE: configYaml.lightning === 'ldk' ? 'LDK' : 'LND',
        })

        // remove old start9 dir
        await rm(join(MAIN_VOL, 'start9'), {
          recursive: true,
        })

        // migrate data from old WORK_DIR (/data/albyhub) to new WORK_DIR (/data)
        const oldDataDir = join(MAIN_VOL, 'albyhub')
        const exists = await stat(oldDataDir)
          .then((s) => s.isDirectory())
          .catch(() => false)

        if (exists) {
          const entries = await readdir(oldDataDir)
          for (const entry of entries) {
            await rename(join(oldDataDir, entry), join(MAIN_VOL, entry))
          }
          await rm(oldDataDir, { recursive: true })
        }
      }
    },
    down: IMPOSSIBLE,
  },
})
