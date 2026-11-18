import { sdk } from './sdk'

// A local LDK snapshot is unsafe after the original channel state advances.
export const { createBackup, restoreInit } = sdk.setupBackups(
  async ({ effects }) =>
    sdk.Backups.ofVolumes('main', 'startos').setOptions({
      // Match all SQLite temp files regardless of database extension (.sqlite, .db, etc.)
      exclude: ['*-journal', '*-wal', '*-shm'],
    }),
)
