import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.24.4:0',
  releaseNotes: {
    en_US:
      'Updated Alby Hub to 1.24.4. Fixes LND routing fee updates and a startup crash with the Core Lightning hold plugin, and includes TLS security mitigations and dependency updates. Updated start-sdk to 3.1.0. Full upstream changes: https://github.com/getAlby/hub/compare/v1.24.3...v1.24.4',
    es_ES:
      'Alby Hub actualizado a 1.24.4. Corrige las actualizaciones de comisiones de enrutamiento de LND y un fallo al iniciar con el plugin de facturas retenidas de Core Lightning, e incluye mitigaciones de seguridad TLS y actualizaciones de dependencias. start-sdk actualizado a 3.1.0. Cambios completos: https://github.com/getAlby/hub/compare/v1.24.3...v1.24.4',
    de_DE:
      'Alby Hub auf 1.24.4 aktualisiert. Behebt Fehler beim Aktualisieren der LND-Routinggebühren und einen Startabsturz mit dem Core-Lightning-Hold-Plugin. Enthält TLS-Sicherheitsmaßnahmen und aktualisierte Abhängigkeiten. start-sdk auf 3.1.0 aktualisiert. Alle Änderungen: https://github.com/getAlby/hub/compare/v1.24.3...v1.24.4',
    pl_PL:
      'Zaktualizowano Alby Hub do 1.24.4. Naprawia aktualizację opłat routingu LND i awarię przy uruchamianiu z wtyczką faktur wstrzymanych Core Lightning. Zawiera zabezpieczenia TLS i aktualizacje zależności. Zaktualizowano start-sdk do 3.1.0. Pełna lista zmian: https://github.com/getAlby/hub/compare/v1.24.3...v1.24.4',
    fr_FR:
      'Alby Hub mis à jour vers 1.24.4. Corrige la mise à jour des frais de routage LND et un plantage au démarrage avec le plugin de factures en attente de Core Lightning. Inclut des mesures de sécurité TLS et des mises à jour des dépendances. start-sdk mis à jour vers 3.1.0. Liste complète des changements : https://github.com/getAlby/hub/compare/v1.24.3...v1.24.4',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
