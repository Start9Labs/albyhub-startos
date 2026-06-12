import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readdir, rename, rm, stat } from 'fs/promises'
import { join } from 'path'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'

export const current = VersionInfo.of({
  version: '1.23.0:0',
  releaseNotes: {
    en_US: 'Adds Just-in-Time channels, a Cards page for debit card top-ups, an experimental Bark backend, redesigned home/stories and currency input flows, improved Core Lightning support, and multiple bug fixes.',
    es_ES: 'Añade canales Just-in-Time, una página de tarjetas para recargas de tarjetas de débito, un backend experimental de Bark, rediseños de inicio/historias y entrada de moneda, mejoras en Core Lightning y varias correcciones.',
    de_DE: 'Fügt Just-in-Time-Kanäle, eine Kartenseite für Debitkarten-Aufladungen, ein experimentelles Bark-Backend, überarbeitete Start-/Stories- und Währungseingabeabläufe, verbesserte Core-Lightning-Unterstützung und mehrere Fehlerbehebungen hinzu.',
    pl_PL: 'Dodaje kanały Just-in-Time, stronę kart do doładowań kart debetowych, eksperymentalny backend Bark, przeprojektowany ekran główny/historie i wprowadzanie waluty, ulepszoną obsługę Core Lightning oraz liczne poprawki błędów.',
    fr_FR: 'Ajoute les canaux Just-in-Time, une page Cartes pour les recharges de cartes de débit, un backend Bark expérimental, des parcours accueil/stories et saisie de devise repensés, une meilleure prise en charge de Core Lightning et plusieurs corrections.',
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
