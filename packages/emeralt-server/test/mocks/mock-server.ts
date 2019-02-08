import { createEmeraltServer } from '@/server'
import { EmeraltDatabaseInMemory } from '@emeralt/database-inmemory'
// import { EmeraltDatabaseRedis } from '@emeralt/database-redis'
import { EmeraltAuthInMemory } from '@emeralt/auth-inmemory'
import { EmeraltStorageInMemory } from '@emeralt/storage-inmemory'
import { TEmeraltServerConfig, Optional } from '@emeralt/types'

export const createMockServer = async (
  config: Optional<TEmeraltServerConfig> = {},
) => {
  const server = await createEmeraltServer({
    config: {
      logLevel: 'silent',
      ...config,
    },
    auth: EmeraltAuthInMemory({
      users: {
        user1: 'user1',
        user2: 'user2',
      },
    }),
    database: EmeraltDatabaseInMemory({}),
    storage: EmeraltStorageInMemory({}),
  }).then((s) => s.listen())

  // @ts-ignore
  const address = `http://localhost:${server.address().port}`

  return {
    server,
    address,
  }
}
