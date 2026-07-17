import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_1_23_0_2 } from './v1.23.0_2'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_1_23_0_2],
})
