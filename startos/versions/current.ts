import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.24.3:0',
  releaseNotes: {
    en_US:
      'Updated Alby Hub to 1.24.3. Re-enables onchain and Lightning swaps through satsrouting.exchange, with configurable swap providers and swap fee controls. Includes UX/UI improvements, bug fixes, and security updates. Full release notes: https://github.com/getAlby/hub/releases/tag/v1.24.3',
    es_ES:
      'Alby Hub actualizado a 1.24.3. Reactiva los swaps entre la cadena de Bitcoin y Lightning a través de satsrouting.exchange, con proveedores de swaps configurables y controles de comisiones. Incluye mejoras de UX/UI, correcciones de errores y actualizaciones de seguridad. Notas completas: https://github.com/getAlby/hub/releases/tag/v1.24.3',
    de_DE:
      'Alby Hub auf 1.24.3 aktualisiert. Aktiviert Swaps zwischen Onchain und Lightning über satsrouting.exchange wieder, mit konfigurierbaren Swap-Anbietern und Einstellungen für Swap-Gebühren. Enthält UX/UI-Verbesserungen, Fehlerbehebungen und Sicherheitsupdates. Vollständige Versionshinweise: https://github.com/getAlby/hub/releases/tag/v1.24.3',
    pl_PL:
      'Zaktualizowano Alby Hub do 1.24.3. Przywraca swapy między łańcuchem Bitcoin a Lightning przez satsrouting.exchange, z konfigurowalnymi dostawcami swapów i ustawieniami opłat. Zawiera ulepszenia UX/UI, poprawki błędów i aktualizacje bezpieczeństwa. Pełne informacje o wydaniu: https://github.com/getAlby/hub/releases/tag/v1.24.3',
    fr_FR:
      'Alby Hub mis à jour vers 1.24.3. Réactive les swaps entre la chaîne Bitcoin et Lightning via satsrouting.exchange, avec des fournisseurs de swaps configurables et des réglages des frais. Inclut des améliorations UX/UI, des corrections de bugs et des mises à jour de sécurité. Notes de version complètes : https://github.com/getAlby/hub/releases/tag/v1.24.3',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
