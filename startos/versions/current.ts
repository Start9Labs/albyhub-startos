import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.24.0:1',
  releaseNotes: {
    en_US: `Names Core Lightning and phoenixd where Alby Hub lists the Lightning node it uses.

Alby Hub can run against three Lightning nodes on this server, but only LND was listed with its name and icon. Choosing Core Lightning or phoenixd left the entry blank and unlabelled, so it was not obvious which node Alby Hub had been pointed at. All three now show properly. Nothing about how Alby Hub reaches your node changes.`,
    es_ES: `Muestra el nombre de Core Lightning y phoenixd donde Alby Hub indica el nodo Lightning que utiliza.

Alby Hub puede funcionar con tres nodos Lightning de este servidor, pero solo LND aparecía con su nombre y su icono. Al elegir Core Lightning o phoenixd, la entrada quedaba vacía y sin etiquetar, así que no resultaba evidente a qué nodo apuntaba Alby Hub. Los tres se muestran ahora correctamente. No cambia nada en la forma en que Alby Hub se conecta a tu nodo.`,
    de_DE: `Benennt Core Lightning und phoenixd dort, wo Alby Hub den verwendeten Lightning-Node anzeigt.

Alby Hub kann mit drei Lightning-Nodes auf diesem Server arbeiten, aber nur LND wurde mit Namen und Symbol aufgeführt. Bei Core Lightning oder phoenixd blieb der Eintrag leer und unbeschriftet, sodass nicht erkennbar war, auf welchen Node Alby Hub verwies. Alle drei werden jetzt korrekt angezeigt. An der Verbindung von Alby Hub zu deinem Node ändert sich nichts.`,
    pl_PL: `Podaje nazwy Core Lightning i phoenixd tam, gdzie Alby Hub wskazuje używany węzeł Lightning.

Alby Hub może korzystać z trzech węzłów Lightning na tym serwerze, ale tylko LND był wyświetlany z nazwą i ikoną. Po wybraniu Core Lightning lub phoenixd wpis pozostawał pusty i nieopisany, więc nie było widać, do którego węzła Alby Hub został skierowany. Wszystkie trzy są teraz wyświetlane poprawnie. Sposób łączenia się Alby Hub z węzłem nie zmienia się.`,
    fr_FR: `Nomme Core Lightning et phoenixd là où Alby Hub indique le nœud Lightning qu'il utilise.

Alby Hub peut fonctionner avec trois nœuds Lightning de ce serveur, mais seul LND apparaissait avec son nom et son icône. En choisissant Core Lightning ou phoenixd, l'entrée restait vide et sans libellé, si bien qu'on ne voyait pas vers quel nœud Alby Hub pointait. Les trois s'affichent désormais correctement. Rien ne change dans la façon dont Alby Hub joint votre nœud.`,
  },
  migrations: {},
})
