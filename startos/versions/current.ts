import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

export const current = VersionInfo.of({
  version: '1.24.1:0',
  releaseNotes: {
    en_US: `UX/UI improvements and security updates. Retries automatic unlock after failures, includes static channel backups in migration exports, shows fees for zero-fee outgoing payments, fixes an LDK shutdown panic, and prevents Boltz swap information from blocking. Includes dependency updates.

- A network port left reserved by the StartOS 0.3.5 version of this package is freed.
- On a new install, the Lightning implementation choice starts with no option selected.`,
    es_ES: `Mejoras de la experiencia de usuario y la interfaz, y actualizaciones de seguridad. Reintenta el desbloqueo automático tras un fallo, incluye copias de seguridad estáticas de canales en las exportaciones de migración, muestra las comisiones de los pagos salientes sin comisión, corrige un fallo de LDK al apagarse y evita bloqueos al obtener información de swaps de Boltz. Incluye actualizaciones de dependencias.

- Se libera un puerto de red que la versión de este paquete para StartOS 0.3.5 dejó reservado.
- En una instalación nueva, la elección de la implementación Lightning empieza sin ninguna opción seleccionada.`,
    de_DE: `Verbesserungen der Benutzeroberfläche und Benutzerfreundlichkeit sowie Sicherheitsupdates. Wiederholt die automatische Entsperrung nach Fehlern, nimmt statische Kanal-Backups in Migrationsexporte auf, zeigt Gebühren bei gebührenfreien ausgehenden Zahlungen an, behebt einen LDK-Absturz beim Herunterfahren und verhindert Blockierungen beim Abrufen von Boltz-Swap-Informationen. Enthält aktualisierte Abhängigkeiten.

- Ein Netzwerkport, den die StartOS-0.3.5-Version dieses Pakets belegt gelassen hatte, wird freigegeben.
- Bei einer Neuinstallation ist bei der Wahl der Lightning-Implementierung zunächst keine Option ausgewählt.`,
    pl_PL: `Ulepszenia interfejsu i wygody użytkowania oraz aktualizacje bezpieczeństwa. Ponawia automatyczne odblokowanie po niepowodzeniu, dołącza statyczne kopie zapasowe kanałów do eksportów migracji, pokazuje opłaty dla płatności wychodzących bez opłat, naprawia awarię LDK podczas zamykania i zapobiega blokowaniu podczas pobierania informacji o swapach Boltz. Zawiera aktualizacje zależności.

- Port sieciowy, który wersja tego pakietu dla StartOS 0.3.5 pozostawiła zajęty, zostaje zwolniony.
- Przy nowej instalacji wybór implementacji Lightning zaczyna się bez zaznaczonej opcji.`,
    fr_FR: `Améliorations de l'expérience utilisateur et de l'interface, et mises à jour de sécurité. Relance le déverrouillage automatique après un échec, inclut les sauvegardes statiques des canaux dans les exports de migration, affiche les frais des paiements sortants sans frais, corrige un plantage de LDK à l'arrêt et évite les blocages lors de la récupération des informations sur les swaps Boltz. Inclut des mises à jour des dépendances.

- Un port réseau que la version de ce paquet pour StartOS 0.3.5 avait laissé réservé est libéré.
- Lors d'une nouvelle installation, le choix de l'implémentation Lightning commence sans option sélectionnée.`,
  },
  migrations: {
    up: async ({ effects }) => {
      // 8443 was the 0.3.5 package's in-container TLS proxy, which no longer exists.
      await sdk.MultiHost.of(effects, 'main').retirePort(8443)
    },
    down: IMPOSSIBLE,
  },
})
