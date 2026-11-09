import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.24.6:1',
  releaseNotes: {
    en_US:
      'Requires StartOS 0.4.1 or later. Alby Hub now reads only the credential it needs from LND, Core Lightning or phoenixd, and can no longer read their seed or other files. Requires LND 0.21.6-beta:3, Core Lightning 26.6.10:3 or phoenixd 0.9.2:4.',
    es_ES:
      'Requiere StartOS 0.4.1 o posterior. Alby Hub ahora lee solo la credencial que necesita de LND, Core Lightning o phoenixd, y ya no puede leer su semilla ni otros archivos. Requiere LND 0.21.6-beta:3, Core Lightning 26.6.10:3 o phoenixd 0.9.2:4.',
    de_DE:
      'Erfordert StartOS 0.4.1 oder neuer. Alby Hub liest von LND, Core Lightning oder phoenixd nur noch die benötigte Zugangsberechtigung und kann deren Seed und andere Dateien nicht mehr lesen. Erfordert LND 0.21.6-beta:3, Core Lightning 26.6.10:3 oder phoenixd 0.9.2:4.',
    pl_PL:
      'Wymaga StartOS 0.4.1 lub nowszego. Alby Hub odczytuje z LND, Core Lightning lub phoenixd tylko potrzebne mu poświadczenie i nie może już odczytać ich seeda ani innych plików. Wymaga LND 0.21.6-beta:3, Core Lightning 26.6.10:3 lub phoenixd 0.9.2:4.',
    fr_FR:
      'Nécessite StartOS 0.4.1 ou ultérieur. Alby Hub ne lit plus que l’identifiant dont il a besoin auprès de LND, Core Lightning ou phoenixd, et ne peut plus lire leur seed ni leurs autres fichiers. Nécessite LND 0.21.6-beta:3, Core Lightning 26.6.10:3 ou phoenixd 0.9.2:4.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
