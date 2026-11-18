import { T } from '@start9labs/start-sdk'
import { storeJson } from './fileModels/store.json'
import { sdk } from './sdk'

const backendIs =
  (backend: 'LND' | 'CLN' | 'PHOENIX') =>
  async ({ effects }: { effects: T.Effects }) =>
    (await storeJson.read((s) => s.LN_BACKEND_TYPE).const(effects)) === backend

const electrumIs =
  (server: 'fulcrum' | 'electrs') =>
  async ({ effects }: { effects: T.Effects }) =>
    (await storeJson
      .read((s) => s.LN_BACKEND_TYPE === 'LDK' && s.ELECTRUM_SERVER === server)
      .const(effects)) ?? false

const lnd = sdk.Dependency.optional('lnd', {
  description: 'Provides a fully sovereign experience',
  metadata: {
    title: 'LND',
    icon: 'https://raw.githubusercontent.com/Start9Labs/lnd-startos/f17336a10769efd8782a347662848c50c6270349/icon.svg',
  },
  versionRange: '>=0.21.6-beta:3',
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
  versionRange: '>=26.6.10:3',
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
  versionRange: '>=0.9.2:4',
  kind: 'running',
  healthChecks: ['primary'],
  enabled: backendIs('PHOENIX'),
})

const fulcrum = sdk.Dependency.optional('fulcrum', {
  description: 'Serves the blockchain to the LDK node',
  metadata: {
    title: 'Fulcrum',
    icon: 'https://raw.githubusercontent.com/Start9Labs/fulcrum-startos/bfae6129543c3c1b2941c5b4078ffc9f31a08d6c/icon.png',
  },
  versionRange: '>=2.1.1:8',
  kind: 'running',
  healthChecks: ['primary', 'sync-progress'],
  enabled: electrumIs('fulcrum'),
})

const electrs = sdk.Dependency.optional('electrs', {
  description: 'Serves the blockchain to the LDK node',
  metadata: {
    title: 'Electrs',
    icon: 'https://raw.githubusercontent.com/Start9Labs/electrs-startos/9987e96edd9b2a849ac7dc34bc8ed97facdf7273/icon.svg',
  },
  versionRange: '>=0.11.1:11',
  kind: 'running',
  healthChecks: ['electrs', 'sync'],
  enabled: electrumIs('electrs'),
})

export const dependencies = sdk.Dependencies.of()
  .addDependency(lnd)
  .addDependency(cln)
  .addDependency(phoenixd)
  .addDependency(fulcrum)
  .addDependency(electrs)
