import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.24.7:1',
  releaseNotes: {
    en_US:
      'Adds a Show Setup Code action. Alby Hub asks for this code in its Web UI before first-time setup or restoring an Alby Hub backup.',
    es_ES:
      'Añade la acción Mostrar código de configuración. Alby Hub solicita este código en su interfaz web antes de la configuración inicial o de restaurar una copia de seguridad de Alby Hub.',
    de_DE:
      'Fügt die Aktion „Einrichtungscode anzeigen“ hinzu. Alby Hub fragt in seiner Web-UI vor der Ersteinrichtung oder der Wiederherstellung eines Alby-Hub-Backups nach diesem Code.',
    pl_PL:
      'Dodaje akcję Pokaż kod konfiguracji. Alby Hub prosi o ten kod w swoim interfejsie webowym przed pierwszą konfiguracją lub przywróceniem kopii zapasowej Alby Hub.',
    fr_FR:
      "Ajoute l'action Afficher le code de configuration. Alby Hub demande ce code dans son interface web avant la configuration initiale ou la restauration d'une sauvegarde Alby Hub.",
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
