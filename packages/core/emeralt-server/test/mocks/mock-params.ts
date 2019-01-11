import { EmeraltAuthInMemory } from '@emeralt/auth-inmemory'
import { EmeraltDatabaseInMemory } from '@emeralt/database-inmemory'
import { EmeraltStorageInMemory } from '@emeralt/storage-inmemory'
import { TEmeraltServerParams } from '@emeralt/types'

export const mockParams = (): TEmeraltServerParams => ({
  config: {
    logLevel: 'dev',
    jwt: {
      secret: 'secret',
    },
  },
  auth: new EmeraltAuthInMemory({
    users: {
      emeralt: 'emeralt',
    },
  }),
  database: new EmeraltDatabaseInMemory(),
  storage: new EmeraltStorageInMemory(),
  plugins: [],
})
