import { T } from '@start9labs/start-sdk'
import { storeJson } from './fileModels/store.json'
import { sdk } from './sdk'

const backendIs =
  (backend: 'LND' | 'CLN' | 'PHOENIX') =>
  async ({ effects }: { effects: T.Effects }) =>
    (await storeJson.read((s) => s.LN_BACKEND_TYPE).const(effects)) === backend

const lnd = sdk.Dependency.optional('lnd', {
  description: 'Provides a fully sovereign experience',
  metadata: {
    title: 'LND',
    icon: 'https://raw.githubusercontent.com/Start9Labs/lnd-startos/f17336a10769efd8782a347662848c50c6270349/icon.svg',
  },
  versionRange: '>=0.21.1-beta:4',
  kind: 'running',
  healthChecks: ['lnd', 'sync-progress'],
  enabled: backendIs('LND'),
})

const cln = sdk.Dependency.optional('c-lightning', {
  description: 'Provides a fully sovereign experience',
  metadata: {
    title: 'Core Lightning',
    icon: 'https://raw.githubusercontent.com/Start9Labs/cln-startos/71b2d1eb78e2d31cc4d62a410512422d39e856e9/icon.svg',
  },
  versionRange: '>=26.6.7:4',
  kind: 'running',
  healthChecks: ['lightningd', 'check-synced'],
  enabled: backendIs('CLN'),
})

const phoenixd = sdk.Dependency.optional('phoenixd', {
  description: 'Provides a minimal, automated Lightning node',
  metadata: {
    title: 'phoenixd',
    icon: 'https://raw.githubusercontent.com/Start9-Community/phoenixd-startos/d95b7028e6578bd5ec0ee1eb70a945232da00961/icon.svg',
  },
  versionRange: '>=0.8.0:1',
  kind: 'running',
  healthChecks: ['primary'],
  enabled: backendIs('PHOENIX'),
})

export const dependencies = sdk.Dependencies.of()
  .addDependency(lnd)
  .addDependency(cln)
  .addDependency(phoenixd)
