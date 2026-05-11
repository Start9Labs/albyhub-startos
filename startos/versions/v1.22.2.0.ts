import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readdir, rename, rm, stat } from 'fs/promises'
import { join } from 'path'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'

export const v_1_22_2_0 = VersionInfo.of({
  version: '1.22.2:0',
  releaseNotes: {
    en_US: `**Features**

- New AI & Agents page
- Integrated on-chain wallet mode
- Custom user labels for transactions
- Redesigned settings pages
- Improved budget selection when creating app connections
- Support for connecting Alby Hub to Core Lightning (Alby's most-requested feature)

Plus many other bug fixes and minor improvements.`,
    es_ES: `**Funciones**

- Nueva página de IA y agentes
- Modo de monedero on-chain integrado
- Etiquetas de usuario personalizadas para las transacciones
- Páginas de configuración rediseñadas
- Selección de presupuesto mejorada al crear conexiones de aplicaciones
- Compatibilidad para conectar Alby Hub con Core Lightning (la función más solicitada de Alby)

Además de muchas otras correcciones de errores y mejoras menores.`,
    de_DE: `**Funktionen**

- Neue Seite für KI und Agenten
- Integrierter On-Chain-Wallet-Modus
- Benutzerdefinierte Labels für Transaktionen
- Überarbeitete Einstellungsseiten
- Verbesserte Budgetauswahl beim Erstellen von App-Verbindungen
- Unterstützung für die Verbindung von Alby Hub mit Core Lightning (die meistgewünschte Funktion von Alby)

Außerdem viele weitere Fehlerbehebungen und kleinere Verbesserungen.`,
    pl_PL: `**Funkcje**

- Nowa strona AI i agentów
- Zintegrowany tryb portfela on-chain
- Niestandardowe etykiety użytkownika dla transakcji
- Przeprojektowane strony ustawień
- Ulepszony wybór budżetu podczas tworzenia połączeń aplikacji
- Obsługa łączenia Alby Hub z Core Lightning (najbardziej wyczekiwana funkcja Alby)

Ponadto wiele innych poprawek błędów i drobnych ulepszeń.`,
    fr_FR: `**Fonctionnalités**

- Nouvelle page IA et agents
- Mode portefeuille on-chain intégré
- Étiquettes utilisateur personnalisées pour les transactions
- Pages de paramètres repensées
- Sélection de budget améliorée lors de la création de connexions d'applications
- Prise en charge de la connexion d'Alby Hub à Core Lightning (la fonctionnalité la plus demandée d'Alby)

Ainsi que de nombreuses autres corrections de bugs et améliorations mineures.`,
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
