import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, readdir, rename, rm, stat } from 'fs/promises'
import { join } from 'path'
import { storeJson } from '../fileModels/store.json'

const MAIN_VOL = '/media/startos/volumes/main'

export const v_1_21_6_0 = VersionInfo.of({
  version: '1.21.6:0',
  releaseNotes: {
    en_US: 'Update to StartOS SDK beta.65',
    es_ES: 'Actualización a StartOS SDK beta.65',
    de_DE: 'Update auf StartOS SDK beta.65',
    pl_PL: 'Aktualizacja do StartOS SDK beta.65',
    fr_FR: 'Mise à jour vers StartOS SDK beta.65',
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
