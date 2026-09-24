import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.24.0:2',
  releaseNotes: {
    en_US: `Fix for Core Lightning users`,
    es_ES: `Corrección para usuarios de Core Lightning`,
    de_DE: `Fehlerbehebung für Core-Lightning-Nutzer`,
    pl_PL: `Poprawka dla użytkowników Core Lightning`,
    fr_FR: `Correctif pour les utilisateurs de Core Lightning`,
  },
  migrations: {},
})
