import { createEmeraltServer } from '@/server'
import { EmeraltDatabaseInMemory } from '@emeralt/database-inmemory'
import { EmeraltAuthInMemory } from '@emeralt/auth-inmemory'
import { EmeraltStorageInMemory } from '@emeralt/storage-inmemory'

export const createMockServer = () => {
  const server = createEmeraltServer({
    config: {
      logLevel: 'silent',
      jwt: {
        secret: 'secret',
      },
    },
    auth: EmeraltAuthInMemory({
      users: {
        user1: 'user1',
        user2: 'user2',
      },
    }),
    database: EmeraltDatabaseInMemory({}),
    storage: EmeraltStorageInMemory({}),
  }).listen()

  // @ts-ignore
  const address = `http://localhost:${server.address().port}`

  return {
    server,
    address,
  }
}
