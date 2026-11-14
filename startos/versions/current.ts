import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.24.7:0',
  releaseNotes: {
    en_US:
      'Updated Alby Hub to 1.24.7. Requires StartOS 0.4.2 or later. Malformed Nostr Wallet Connect requests no longer crash Alby Hub, a canceled hold invoice paid to yourself is no longer settled, and swaps are validated more strictly and retry their claims. Adds OpenReceive to the app store. Full changes: https://github.com/getAlby/hub/compare/v1.24.6...v1.24.7',
    es_ES:
      'Alby Hub actualizado a 1.24.7. Requiere StartOS 0.4.2 o posterior. Las solicitudes mal formadas de Nostr Wallet Connect ya no bloquean Alby Hub, una factura retenida cancelada que te pagas a ti mismo ya no se liquida, y los intercambios se validan de forma más estricta y reintentan sus reclamaciones. Añade OpenReceive a la tienda de aplicaciones. Cambios completos: https://github.com/getAlby/hub/compare/v1.24.6...v1.24.7',
    de_DE:
      'Alby Hub auf 1.24.7 aktualisiert. Erfordert StartOS 0.4.2 oder neuer. Fehlerhafte Nostr-Wallet-Connect-Anfragen bringen Alby Hub nicht mehr zum Absturz, eine stornierte Hold-Rechnung, die man sich selbst bezahlt, wird nicht mehr abgerechnet, und Swaps werden strenger geprüft und wiederholen ihre Claims. Fügt OpenReceive zum App Store hinzu. Alle Änderungen: https://github.com/getAlby/hub/compare/v1.24.6...v1.24.7',
    pl_PL:
      'Zaktualizowano Alby Hub do 1.24.7. Wymaga StartOS 0.4.2 lub nowszego. Nieprawidłowe żądania Nostr Wallet Connect nie powodują już awarii Alby Hub, anulowana faktura wstrzymana opłacona samemu sobie nie jest już rozliczana, a swapy są ściślej weryfikowane i ponawiają swoje roszczenia. Dodaje OpenReceive do sklepu z aplikacjami. Pełna lista zmian: https://github.com/getAlby/hub/compare/v1.24.6...v1.24.7',
    fr_FR:
      'Alby Hub mis à jour vers 1.24.7. Nécessite StartOS 0.4.2 ou ultérieur. Les requêtes Nostr Wallet Connect malformées ne font plus planter Alby Hub, une facture en attente annulée que vous vous payez à vous-même n’est plus réglée, et les swaps sont validés plus strictement et retentent leurs réclamations. Ajoute OpenReceive à la boutique d’applications. Modifications complètes : https://github.com/getAlby/hub/compare/v1.24.6...v1.24.7',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
