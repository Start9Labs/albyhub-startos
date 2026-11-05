import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.24.6:0',
  releaseNotes: {
    en_US:
      'Updated Alby Hub to 1.24.6 with bug fixes and security updates. Reuses LNURL invoices when retrying payments and prevents UI crashes from unexpected metadata types. Full upstream changes: https://github.com/getAlby/hub/releases/tag/v1.24.6',
    es_ES:
      'Alby Hub actualizado a 1.24.6 con correcciones de errores y actualizaciones de seguridad. Reutiliza las facturas LNURL al reintentar pagos y evita fallos de la interfaz causados por tipos de metadatos inesperados. Cambios completos: https://github.com/getAlby/hub/releases/tag/v1.24.6',
    de_DE:
      'Alby Hub auf 1.24.6 mit Fehlerbehebungen und Sicherheitsupdates aktualisiert. Verwendet LNURL-Rechnungen bei erneuten Zahlungsversuchen wieder und verhindert Abstürze der Benutzeroberfläche durch unerwartete Metadatentypen. Alle Änderungen: https://github.com/getAlby/hub/releases/tag/v1.24.6',
    pl_PL:
      'Zaktualizowano Alby Hub do 1.24.6 z poprawkami błędów i aktualizacjami zabezpieczeń. Ponownie wykorzystuje faktury LNURL przy ponawianiu płatności i zapobiega awariom interfejsu spowodowanym nieoczekiwanymi typami metadanych. Pełna lista zmian: https://github.com/getAlby/hub/releases/tag/v1.24.6',
    fr_FR:
      'Alby Hub mis à jour vers 1.24.6 avec des corrections de bugs et des mises à jour de sécurité. Réutilise les factures LNURL lors des nouvelles tentatives de paiement et évite les plantages de l’interface dus à des types de métadonnées inattendus. Liste complète des changements : https://github.com/getAlby/hub/releases/tag/v1.24.6',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
