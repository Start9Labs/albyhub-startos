import { VersionGraph } from '@start9labs/start-sdk'
import { current, other } from './versions'
import { sdk } from '../sdk'
import { setLightning } from '../actions/setLightning'

export const versionGraph = VersionGraph.of({
  current,
  other,
  preInstall: async (effects) => {
    await sdk.action.createOwnTask(effects, setLightning, 'critical', {
      reason: 'Choose your backend lightning implementation',
    })
  },
})
