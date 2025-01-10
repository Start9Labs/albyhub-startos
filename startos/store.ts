import { setupExposeStore } from '@start9labs/start-sdk'

export type Store = {
  implementation: 'lnd' | 'ldk'
}

export const exposedStore = setupExposeStore<Store>((pathBuilder) => [])
