import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readdir, rename, rm, stat } from 'fs/promises'
import { join } from 'path'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'

export const v_1_21_6_4 = VersionInfo.of({
  version: '1.21.6:4',
  releaseNotes: {
    en_US:
      'Fix backup failure caused by transient SQLite journal/WAL/SHM files; run Alby Hub as PID 1 so it receives SIGTERM directly and shuts down gracefully (prevents SQLite corruption on stop/restart)',
    es_ES:
      'Corrige el fallo de copia de seguridad causado por archivos transitorios de SQLite (journal/WAL/SHM); ejecuta Alby Hub como PID 1 para que reciba SIGTERM directamente y se cierre con elegancia (evita la corrupción de SQLite al detener/reiniciar)',
    de_DE:
      'Behebt Backup-Fehler durch flüchtige SQLite-Journal-/WAL-/SHM-Dateien; führt Alby Hub als PID 1 aus, damit SIGTERM direkt empfangen und ein sauberes Herunterfahren ermöglicht wird (verhindert SQLite-Korruption beim Stoppen/Neustart)',
    pl_PL:
      'Naprawia błąd kopii zapasowej spowodowany przez tymczasowe pliki SQLite (journal/WAL/SHM); uruchamia Alby Hub jako PID 1, aby otrzymywał SIGTERM bezpośrednio i wyłączał się prawidłowo (zapobiega uszkodzeniu SQLite przy zatrzymaniu/restarcie)',
    fr_FR:
      'Corrige l’échec de sauvegarde causé par les fichiers transitoires SQLite (journal/WAL/SHM) ; exécute Alby Hub en tant que PID 1 pour qu’il reçoive SIGTERM directement et s’arrête proprement (évite la corruption SQLite à l’arrêt/redémarrage)',
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
