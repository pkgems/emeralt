import { createEmeraltServer } from '@/server'
import { EmeraltDatabaseInMemory } from '@emeralt/database-inmemory'
import { EmeraltAuthInMemory } from '@emeralt/auth-inmemory'
import { EmeraltStorageInMemory } from '@emeralt/storage-inmemory'

export const createMockServer = () => {
  const auth = new EmeraltAuthInMemory()
  const database = new EmeraltDatabaseInMemory()
  const storage = new EmeraltStorageInMemory()
  const plugins = []

  return {
    server: createEmeraltServer({
      config: {
        logLevel: 'silent',
        jwt: {
          secret: 'secret'
        }
      },
      auth,
      database,
      storage,
      plugins,
    }).listen(),
    storage,
    auth,
    plugins,
  }
}
