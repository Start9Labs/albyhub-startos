import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.24.8:1',
  releaseNotes: {
    en_US: 'Adds guidance on linking an Alby account to the instructions.',
    es_ES:
      'Añade a las instrucciones indicaciones para vincular una cuenta de Alby.',
    de_DE:
      'Ergänzt die Anleitung um Hinweise zum Verknüpfen eines Alby-Kontos.',
    pl_PL: 'Dodaje do instrukcji wskazówki dotyczące łączenia konta Alby.',
    fr_FR: 'Ajoute aux instructions des conseils pour associer un compte Alby.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
