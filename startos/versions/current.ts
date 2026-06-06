import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readdir, rename, rm, stat } from 'fs/promises'
import { join } from 'path'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'

export const current = VersionInfo.of({
  version: '1.22.2:2',
  releaseNotes: {
    en_US: 'Adds Core Lightning as a Lightning backend option.',
    es_ES: 'Añade Core Lightning como opción de backend Lightning.',
    de_DE: 'Fügt Core Lightning als Lightning-Backend-Option hinzu.',
    pl_PL: 'Dodaje Core Lightning jako opcję backendu Lightning.',
    fr_FR: 'Ajoute Core Lightning comme option de backend Lightning.',
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
        await storeJson.merge(effects, {
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
          await storeJson.merge(effects, {
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
