import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.24.0:2',
  releaseNotes: {
    en_US: `Requires the Core Lightning release that fixes gRPC connections on StartOS 0.4.0.2 and later.

On those StartOS versions, Alby Hub set to Core Lightning failed to start with "tls: unrecognized name", because StartOS refused the connection before it reached your node. The fix is in the Core Lightning package, and with this update StartOS asks you to install it. If you use LND, phoenixd, or one of the built-in nodes, nothing changes.`,
    es_ES: `Requiere la versión de Core Lightning que corrige las conexiones gRPC en StartOS 0.4.0.2 y versiones posteriores.

En esas versiones de StartOS, Alby Hub configurado con Core Lightning no arrancaba y mostraba «tls: unrecognized name», porque StartOS rechazaba la conexión antes de que llegara a tu nodo. La corrección está en el paquete de Core Lightning, y con esta actualización StartOS te pide instalarla. Si usas LND, phoenixd o uno de los nodos integrados, no cambia nada.`,
    de_DE: `Setzt die Core-Lightning-Version voraus, die gRPC-Verbindungen unter StartOS 0.4.0.2 und neuer repariert.

Unter diesen StartOS-Versionen startete ein auf Core Lightning eingestelltes Alby Hub nicht und meldete „tls: unrecognized name“, weil StartOS die Verbindung abwies, bevor sie deinen Node erreichte. Die Korrektur steckt im Core-Lightning-Paket, und mit diesem Update fordert StartOS dich auf, sie zu installieren. Wenn du LND, phoenixd oder einen der eingebauten Nodes verwendest, ändert sich nichts.`,
    pl_PL: `Wymaga wydania Core Lightning, które naprawia połączenia gRPC w StartOS 0.4.0.2 i nowszych.

W tych wersjach StartOS Alby Hub ustawiony na Core Lightning nie uruchamiał się i zgłaszał „tls: unrecognized name”, ponieważ StartOS odrzucał połączenie, zanim dotarło do węzła. Poprawka znajduje się w pakiecie Core Lightning, a po tej aktualizacji StartOS poprosi o jej zainstalowanie. Jeśli używasz LND, phoenixd lub jednego z wbudowanych węzłów, nic się nie zmienia.`,
    fr_FR: `Exige la version de Core Lightning qui corrige les connexions gRPC sous StartOS 0.4.0.2 et versions ultérieures.

Sous ces versions de StartOS, Alby Hub réglé sur Core Lightning ne démarrait pas et affichait « tls: unrecognized name », car StartOS refusait la connexion avant qu'elle n'atteigne votre nœud. Le correctif se trouve dans le paquet Core Lightning, et avec cette mise à jour StartOS vous demande de l'installer. Si vous utilisez LND, phoenixd ou l'un des nœuds intégrés, rien ne change.`,
  },
  migrations: {},
})
