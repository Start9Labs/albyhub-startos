import { VersionGraph } from '@start9labs/start-sdk'
import { current, other } from './versions'
import { store } from '../fileModels/store.json'

export const versionGraph = VersionGraph.of({
  current,
  other,
  preInstall: async (effects) => {
    await store.write(effects, { LN_BACKEND_TYPE: null })
  },
})
