import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_1_23_0_2 } from './v1.23.0_2'
import { v_1_24_1_0 } from './v1.24.1_0'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_1_23_0_2, v_1_24_1_0],
})
