import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.24.5:0',
  releaseNotes: {
    en_US:
      'Updated Alby Hub to 1.24.5. Rejects invalid app keys, improves Nostr Wallet Connect error reporting and notification handling, prevents LDK shutdown hangs, and validates swap addresses for the wallet network. Full upstream changes: https://github.com/getAlby/hub/compare/v1.24.4...v1.24.5',
    es_ES:
      'Alby Hub actualizado a 1.24.5. Rechaza claves de aplicaciones no válidas, mejora los errores y las notificaciones de Nostr Wallet Connect, evita bloqueos al apagar LDK y valida las direcciones de swaps para la red de la billetera. Cambios completos: https://github.com/getAlby/hub/compare/v1.24.4...v1.24.5',
    de_DE:
      'Alby Hub auf 1.24.5 aktualisiert. Weist ungültige App-Schlüssel zurück, verbessert Fehlermeldungen und Benachrichtigungen von Nostr Wallet Connect, verhindert Hänger beim Beenden von LDK und prüft Swap-Adressen für das Wallet-Netzwerk. Alle Änderungen: https://github.com/getAlby/hub/compare/v1.24.4...v1.24.5',
    pl_PL:
      'Zaktualizowano Alby Hub do 1.24.5. Odrzuca nieprawidłowe klucze aplikacji, poprawia zgłaszanie błędów i obsługę powiadomień Nostr Wallet Connect, zapobiega zawieszaniu LDK podczas wyłączania i sprawdza adresy swapów dla sieci portfela. Pełna lista zmian: https://github.com/getAlby/hub/compare/v1.24.4...v1.24.5',
    fr_FR:
      'Alby Hub mis à jour vers 1.24.5. Rejette les clés d’applications invalides, améliore les erreurs et les notifications Nostr Wallet Connect, évite les blocages à l’arrêt de LDK et valide les adresses de swaps pour le réseau du portefeuille. Liste complète des changements : https://github.com/getAlby/hub/compare/v1.24.4...v1.24.5',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
