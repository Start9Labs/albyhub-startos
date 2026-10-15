import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.24.2:0',
  releaseNotes: {
    en_US: 'Updated Alby Hub to 1.24.2. Refreshes phoenixd connection settings on every start, restricts hold-invoice settlement and cancellation to the creating app, improves swap fee controls and provider selection, and repairs incomplete LDK static channel backups. Updated start-sdk to 3.0.6. Full upstream changes: https://github.com/getAlby/hub/compare/v1.24.1...v1.24.2',
    es_ES: 'Alby Hub actualizado a 1.24.2. Actualiza la conexión con phoenixd en cada inicio, restringe la liquidación y cancelación de facturas retenidas a la aplicación que las creó, mejora los controles de comisiones y la selección de proveedores de swaps, y repara las copias de seguridad estáticas incompletas de canales LDK. start-sdk actualizado a 3.0.6. Cambios completos: https://github.com/getAlby/hub/compare/v1.24.1...v1.24.2',
    de_DE: 'Alby Hub auf 1.24.2 aktualisiert. Aktualisiert die phoenixd-Verbindung bei jedem Start, beschränkt das Begleichen und Stornieren von Hold-Rechnungen auf die erstellende App, verbessert Swap-Gebührensteuerung und Anbieterauswahl und repariert unvollständige statische LDK-Kanal-Backups. start-sdk auf 3.0.6 aktualisiert. Alle Änderungen: https://github.com/getAlby/hub/compare/v1.24.1...v1.24.2',
    pl_PL: 'Zaktualizowano Alby Hub do 1.24.2. Odświeża ustawienia połączenia z phoenixd przy każdym uruchomieniu, ogranicza rozliczanie i anulowanie faktur wstrzymanych do aplikacji, która je utworzyła, ulepsza ustawianie opłat i wybór dostawców swapów oraz naprawia niekompletne statyczne kopie zapasowe kanałów LDK. Zaktualizowano start-sdk do 3.0.6. Pełna lista zmian: https://github.com/getAlby/hub/compare/v1.24.1...v1.24.2',
    fr_FR: 'Alby Hub mis à jour vers 1.24.2. Actualise la connexion à phoenixd à chaque démarrage, réserve le règlement et l’annulation des factures en attente à l’application qui les a créées, améliore les réglages des frais et le choix du fournisseur de swaps, et répare les sauvegardes statiques incomplètes des canaux LDK. start-sdk mis à jour vers 3.0.6. Liste complète des changements : https://github.com/getAlby/hub/compare/v1.24.1...v1.24.2',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
