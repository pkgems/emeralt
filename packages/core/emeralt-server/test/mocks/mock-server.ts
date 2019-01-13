import { createEmeraltServer } from '@/server'
import { EmeraltDatabaseInMemory } from '@emeralt/database-inmemory'
import { EmeraltAuthInMemory } from '@emeralt/auth-inmemory'
import { EmeraltStorageInMemory } from '@emeralt/storage-inmemory'
import RegClient from 'npm-registry-client'
import doasync from 'doasync'
import npmlog from 'npmlog'

export const createMockServer = () => {
  const auth = new EmeraltAuthInMemory({
    users: {
      user1: 'user1',
      user2: 'user2',
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

  // @ts-ignore
  const address = `http://localhost:${server.address().port}`
  npmlog.level = 'silent'

  return {
    server,
    storage,
    auth,
    plugins,
    address,
  }
}
