import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'

export const current = VersionInfo.of({
  version: '1.24.7:1',
  releaseNotes: {
    en_US:
      "Adds a Show Setup Code action. Alby Hub asks for this code in its Web UI before first-time setup or restoring an Alby Hub backup. The LDK backend reads the blockchain from an Electrum server you choose with the new Set Electrum Server action: Fulcrum or Electrs on this server, or Alby's. Existing LDK nodes keep Alby's Electrum server after updating and are not stopped; run Set Electrum Server to switch to Fulcrum or Electrs on this server. With a backend on this server, Alby Hub now waits for it to be running and synced before starting, and restarts after a sustained backend outage. Unlock the wallet again after this restart unless Auto Unlock is enabled.",
    es_ES:
      'Añade la acción Mostrar código de configuración. Alby Hub solicita este código en su interfaz web antes de la configuración inicial o de restaurar una copia de seguridad de Alby Hub. El backend LDK lee la cadena de bloques del servidor Electrum que elija con la nueva acción Establecer servidor Electrum: Fulcrum o Electrs en este servidor, o el de Alby. Los nodos LDK existentes conservan el servidor Electrum de Alby tras actualizar y no se detienen; ejecute Establecer servidor Electrum para cambiar a Fulcrum o Electrs en este servidor. Con un backend en este servidor, Alby Hub ahora espera a que esté en ejecución y sincronizado antes de iniciarse, y se reinicia tras una interrupción prolongada del backend. Vuelva a desbloquear la cartera después de este reinicio, salvo que esté activado el desbloqueo automático.',
    de_DE:
      'Fügt die Aktion „Einrichtungscode anzeigen“ hinzu. Alby Hub fragt in seiner Web-UI vor der Ersteinrichtung oder der Wiederherstellung eines Alby-Hub-Backups nach diesem Code. Das LDK-Backend liest die Blockchain von einem Electrum-Server, den Sie mit der neuen Aktion „Electrum-Server festlegen“ wählen: Fulcrum oder Electrs auf diesem Server oder den von Alby. Bestehende LDK-Knoten behalten nach dem Update den Electrum-Server von Alby und werden nicht angehalten; mit „Electrum-Server festlegen“ wechseln Sie zu Fulcrum oder Electrs auf diesem Server. Mit einem Backend auf diesem Server wartet Alby Hub nun, bis es läuft und synchronisiert ist, bevor es startet, und startet nach einem anhaltenden Backend-Ausfall neu. Entsperren Sie die Wallet danach erneut, sofern Auto Unlock nicht aktiviert ist.',
    pl_PL:
      'Dodaje akcję Pokaż kod konfiguracji. Alby Hub prosi o ten kod w swoim interfejsie webowym przed pierwszą konfiguracją lub przywróceniem kopii zapasowej Alby Hub. Backend LDK odczytuje blockchain z serwera Electrum wybranego nową akcją Ustaw serwer Electrum: Fulcrum lub Electrs na tym serwerze albo serwera Alby. Istniejące węzły LDK po aktualizacji zachowują serwer Electrum Alby i nie są zatrzymywane; uruchom Ustaw serwer Electrum, aby przełączyć się na Fulcrum lub Electrs na tym serwerze. Przy backendzie na tym serwerze Alby Hub czeka teraz, aż będzie on uruchomiony i zsynchronizowany, zanim wystartuje, i uruchamia się ponownie po dłuższej niedostępności backendu. Po ponownym uruchomieniu odblokuj portfel, chyba że włączono automatyczne odblokowywanie.',
    fr_FR:
      "Ajoute l'action Afficher le code de configuration. Alby Hub demande ce code dans son interface web avant la configuration initiale ou la restauration d'une sauvegarde Alby Hub. Le backend LDK lit la blockchain depuis le serveur Electrum que vous choisissez avec la nouvelle action Définir le serveur Electrum : Fulcrum ou Electrs sur ce serveur, ou celui d'Alby. Les nœuds LDK existants conservent le serveur Electrum d'Alby après la mise à jour et ne sont pas arrêtés ; exécutez Définir le serveur Electrum pour passer à Fulcrum ou Electrs sur ce serveur. Avec un backend sur ce serveur, Alby Hub attend désormais qu'il soit en cours d'exécution et synchronisé avant de démarrer, et redémarre après une indisponibilité prolongée du backend. Déverrouillez à nouveau le portefeuille après ce redémarrage, sauf si le déverrouillage automatique est activé.",
  },
  migrations: {
    up: async ({ effects }) => {
      const store = await storeJson.read().once()
      if (store?.LN_BACKEND_TYPE !== 'LDK' || store.ELECTRUM_SERVER) return
      // LDK used upstream's default, Alby's Electrum server, before the choice existed.
      await storeJson.merge(effects, { ELECTRUM_SERVER: 'alby' })
    },
    down: IMPOSSIBLE,
  },
})
