import { createEmeraltServer } from '@/server'
import { EmeraltDatabaseInMemory } from '@emeralt/database-inmemory'
import { EmeraltAuthInMemory } from '@emeralt/auth-inmemory'
import { EmeraltStorageInMemory } from '@emeralt/storage-inmemory'
import { getAddress } from '@emeralt/utils'

export const createMockServer = () => {
  const auth = new EmeraltAuthInMemory({
    users: {
      emeralt: 'emeralt',
    },
  })
  const database = new EmeraltDatabaseInMemory()
  const storage = new EmeraltStorageInMemory()
  const plugins = []

  const server = createEmeraltServer({
    config: {
      logLevel: 'silent',
      jwt: {
        secret: 'secret',
      },
    },
    auth,
    database,
    storage,
    plugins,
  }).listen()

  const address = getAddress(server)

  return {
    server,
    storage,
    auth,
    plugins,
    address,
  }
}
