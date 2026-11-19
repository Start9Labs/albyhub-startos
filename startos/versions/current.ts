import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.24.8:0',
  releaseNotes: {
    en_US:
      'Fixes LDK Electrum client hangs with timeouts and retries. Adds Podtunes to the app store and improves app search to match anywhere in the app name.',
    es_ES:
      'Corrige los bloqueos del cliente Electrum de LDK mediante tiempos de espera y reintentos. Añade Podtunes a la tienda de aplicaciones y mejora la búsqueda para encontrar coincidencias en cualquier parte del nombre de la aplicación.',
    de_DE:
      'Behebt Hänger des LDK-Electrum-Clients durch Zeitlimits und Wiederholungsversuche. Fügt Podtunes zum App-Store hinzu und verbessert die App-Suche, sodass Treffer an jeder Stelle des App-Namens gefunden werden.',
    pl_PL:
      'Naprawia zawieszanie się klienta Electrum w LDK dzięki limitom czasu i ponawianiu prób. Dodaje Podtunes do sklepu z aplikacjami i ulepsza wyszukiwanie, dopasowując dowolny fragment nazwy aplikacji.',
    fr_FR:
      'Corrige les blocages du client Electrum de LDK grâce à des délais d’attente et des tentatives automatiques. Ajoute Podtunes au magasin d’applications et améliore la recherche pour trouver des correspondances dans n’importe quelle partie du nom de l’application.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
