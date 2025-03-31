import { setupExposeStore } from '@start9labs/start-sdk'

export type Store = {
  LN_BACKEND_TYPE: 'LND' | 'LDK' | null
}

export const exposedStore = setupExposeStore<Store>(() => [])
