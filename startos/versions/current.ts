import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.23.0:5',
  releaseNotes: {
    en_US: `Keeps the its Lightning backend connection working when its Lightning backend changes how it serves TLS.

Alby Hub resolved its Lightning backend's address from a field that is only populated for one of the two ways a service can publish a port. It now reads the address itself, which is correct either way — so the connection survives its Lightning backend's next update instead of going unreachable.`,
    es_ES: `Mantiene la conexión con its Lightning backend cuando its Lightning backend cambia su forma de servir TLS.

Alby Hub resolvía la dirección de its Lightning backend a partir de un campo que solo se rellena en una de las dos formas en que un servicio puede publicar un puerto. Ahora lee la dirección en sí, que es correcta en ambos casos, así que la conexión sobrevive a la próxima actualización de its Lightning backend en lugar de quedar inaccesible.`,
    de_DE: `Hält die its Lightning backend-Verbindung aufrecht, wenn its Lightning backend die Art der TLS-Bereitstellung ändert.

Alby Hub ermittelte die Adresse von its Lightning backend aus einem Feld, das nur bei einer der beiden Arten gefüllt ist, auf die ein Dienst einen Port veröffentlichen kann. Jetzt wird die Adresse selbst gelesen, die in beiden Fällen stimmt — die Verbindung übersteht damit das nächste its Lightning backend-Update, statt unerreichbar zu werden.`,
    pl_PL: `Utrzymuje połączenie z its Lightning backend, gdy its Lightning backend zmienia sposób udostępniania TLS.

Alby Hub ustalał adres its Lightning backend na podstawie pola wypełnianego tylko przy jednym z dwóch sposobów publikowania portu przez usługę. Teraz odczytuje sam adres, poprawny w obu przypadkach — dzięki temu połączenie przetrwa kolejną aktualizację its Lightning backend, zamiast stać się nieosiągalne.`,
    fr_FR: `Maintient la connexion à its Lightning backend lorsque its Lightning backend change sa façon de servir TLS.

Alby Hub déterminait l'adresse de its Lightning backend à partir d'un champ renseigné dans un seul des deux modes de publication d'un port par un service. Il lit désormais l'adresse elle-même, correcte dans les deux cas — la connexion survit donc à la prochaine mise à jour de its Lightning backend au lieu de devenir injoignable.`,
  },
  migrations: {},
})
