import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.24.0:0',
  releaseNotes: {
    en_US: `Updates Alby Hub to 1.24.0.

**Security**

- The swaps, mnemonic, and log endpoints now require a full-access API key.
- Backup restore can no longer write outside the restore directory.
- Redirect URLs are validated, request bodies are kept out of error logs, empty unlock passwords are rejected, and unlock attempts are rate limited globally rather than per IP.

**Features**

- Filter the transaction list, receive invoices to connected apps, and a refreshed payment QR and status display.

**Fixes**

- phoenixd invoice lookup falls back to outgoing payments.
- Bark support updated for the mandatory Bark SDK upgrade.

Full release notes: https://github.com/getAlby/hub/releases/tag/v1.24.0`,
    es_ES: `Actualiza Alby Hub a 1.24.0.

**Seguridad**

- Los endpoints de swaps, frase mnemotécnica y registros ahora requieren una clave de API con acceso completo.
- La restauración de copias de seguridad ya no puede escribir fuera del directorio de restauración.
- Se validan las URL de redirección, los cuerpos de las peticiones se excluyen de los registros de error, se rechazan las contraseñas de desbloqueo vacías y el límite de intentos de desbloqueo ahora es global en lugar de por IP.

**Novedades**

- Filtrado de la lista de transacciones, recepción de facturas en las aplicaciones conectadas y nueva presentación del QR y del estado de pago.

**Correcciones**

- La búsqueda de facturas de phoenixd recurre a los pagos salientes.
- Se actualiza la compatibilidad con Bark por la actualización obligatoria del SDK de Bark.

Notas completas de la versión: https://github.com/getAlby/hub/releases/tag/v1.24.0`,
    de_DE: `Aktualisiert Alby Hub auf 1.24.0.

**Sicherheit**

- Die Endpunkte für Swaps, Mnemonic und Logs erfordern jetzt einen API-Schlüssel mit Vollzugriff.
- Die Backup-Wiederherstellung kann nicht mehr außerhalb des Wiederherstellungsverzeichnisses schreiben.
- Weiterleitungs-URLs werden validiert, Anfrage-Inhalte erscheinen nicht mehr in Fehlerprotokollen, leere Entsperrkennwörter werden abgelehnt und Entsperrversuche werden global statt pro IP begrenzt.

**Funktionen**

- Filtern der Transaktionsliste, Empfang von Rechnungen in verbundenen Apps sowie überarbeitete Darstellung von Zahlungs-QR-Code und -Status.

**Fehlerbehebungen**

- Die phoenixd-Rechnungssuche greift auf ausgehende Zahlungen zurück.
- Bark-Unterstützung an das verpflichtende Bark-SDK-Update angepasst.

Vollständige Versionshinweise: https://github.com/getAlby/hub/releases/tag/v1.24.0`,
    pl_PL: `Aktualizuje Alby Hub do 1.24.0.

**Bezpieczeństwo**

- Punkty końcowe swapów, frazy mnemonicznej i dzienników wymagają teraz klucza API z pełnym dostępem.
- Przywracanie kopii zapasowej nie może już zapisywać poza katalogiem przywracania.
- Adresy przekierowań są weryfikowane, treści żądań nie trafiają do dzienników błędów, puste hasła odblokowujące są odrzucane, a limit prób odblokowania działa globalnie zamiast na adres IP.

**Nowości**

- Filtrowanie listy transakcji, odbieranie faktur w podłączonych aplikacjach oraz odświeżony widok kodu QR i statusu płatności.

**Poprawki**

- Wyszukiwanie faktur w phoenixd korzysta zapasowo z płatności wychodzących.
- Obsługa Bark dostosowana do obowiązkowej aktualizacji SDK Bark.

Pełne informacje o wydaniu: https://github.com/getAlby/hub/releases/tag/v1.24.0`,
    fr_FR: `Met à jour Alby Hub vers 1.24.0.

**Sécurité**

- Les points d'accès pour les swaps, la phrase mnémonique et les journaux exigent désormais une clé d'API à accès complet.
- La restauration de sauvegarde ne peut plus écrire en dehors du répertoire de restauration.
- Les URL de redirection sont validées, le corps des requêtes est exclu des journaux d'erreurs, les mots de passe de déverrouillage vides sont refusés et les tentatives de déverrouillage sont limitées globalement plutôt que par IP.

**Fonctionnalités**

- Filtrage de la liste des transactions, réception de factures dans les applications connectées et nouvel affichage du QR code et du statut de paiement.

**Corrections**

- La recherche de factures phoenixd bascule sur les paiements sortants.
- Prise en charge de Bark mise à jour pour la mise à niveau obligatoire du SDK Bark.

Notes de version complètes : https://github.com/getAlby/hub/releases/tag/v1.24.0`,
  },
  migrations: {},
})
