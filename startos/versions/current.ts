import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.24.7:1',
  releaseNotes: {
    en_US:
      "Adds a Show Setup Code action. Alby Hub asks for this code in its Web UI before first-time setup or restoring an Alby Hub backup. The LDK backend reads the blockchain from an Electrum server you choose with the new Set Electrum Server action: Fulcrum or Electrs on this server, or Alby's. Existing LDK installs are asked to choose after updating. With a backend on this server, Alby Hub now waits for it to be running and synced before starting, and restarts after a sustained backend outage. Unlock the wallet again after this restart unless Auto Unlock is enabled.",
    es_ES:
      'Añade la acción Mostrar código de configuración. Alby Hub solicita este código en su interfaz web antes de la configuración inicial o de restaurar una copia de seguridad de Alby Hub. El backend LDK lee la cadena de bloques del servidor Electrum que elija con la nueva acción Establecer servidor Electrum: Fulcrum o Electrs en este servidor, o el de Alby. Las instalaciones LDK existentes deberán elegirlo tras actualizar. Con un backend en este servidor, Alby Hub ahora espera a que esté en ejecución y sincronizado antes de iniciarse, y se reinicia tras una interrupción prolongada del backend. Vuelva a desbloquear la cartera después de este reinicio, salvo que esté activado el desbloqueo automático.',
    de_DE:
      'Fügt die Aktion „Einrichtungscode anzeigen“ hinzu. Alby Hub fragt in seiner Web-UI vor der Ersteinrichtung oder der Wiederherstellung eines Alby-Hub-Backups nach diesem Code. Das LDK-Backend liest die Blockchain von einem Electrum-Server, den Sie mit der neuen Aktion „Electrum-Server festlegen“ wählen: Fulcrum oder Electrs auf diesem Server oder den von Alby. Bestehende LDK-Installationen werden nach dem Update zur Auswahl aufgefordert. Mit einem Backend auf diesem Server wartet Alby Hub nun, bis es läuft und synchronisiert ist, bevor es startet, und startet nach einem anhaltenden Backend-Ausfall neu. Entsperren Sie die Wallet danach erneut, sofern Auto Unlock nicht aktiviert ist.',
    pl_PL:
      'Dodaje akcję Pokaż kod konfiguracji. Alby Hub prosi o ten kod w swoim interfejsie webowym przed pierwszą konfiguracją lub przywróceniem kopii zapasowej Alby Hub. Backend LDK odczytuje blockchain z serwera Electrum wybranego nową akcją Ustaw serwer Electrum: Fulcrum lub Electrs na tym serwerze albo serwera Alby. Istniejące instalacje LDK zostaną poproszone o wybór po aktualizacji. Przy backendzie na tym serwerze Alby Hub czeka teraz, aż będzie on uruchomiony i zsynchronizowany, zanim wystartuje, i uruchamia się ponownie po dłuższej niedostępności backendu. Po ponownym uruchomieniu odblokuj portfel, chyba że włączono automatyczne odblokowywanie.',
    fr_FR:
      "Ajoute l'action Afficher le code de configuration. Alby Hub demande ce code dans son interface web avant la configuration initiale ou la restauration d'une sauvegarde Alby Hub. Le backend LDK lit la blockchain depuis le serveur Electrum que vous choisissez avec la nouvelle action Définir le serveur Electrum : Fulcrum ou Electrs sur ce serveur, ou celui d'Alby. Les installations LDK existantes devront le choisir après la mise à jour. Avec un backend sur ce serveur, Alby Hub attend désormais qu'il soit en cours d'exécution et synchronisé avant de démarrer, et redémarre après une indisponibilité prolongée du backend. Déverrouillez à nouveau le portefeuille après ce redémarrage, sauf si le déverrouillage automatique est activé.",
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
