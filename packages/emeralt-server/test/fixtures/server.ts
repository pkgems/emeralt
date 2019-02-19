import { TUser } from '@emeralt/types'
import { createEmeraltServer } from '../../src/server'
import { EmeraltAuthInMemory } from '@emeralt/auth-inmemory'
import { EmeraltDatabaseInMemory } from '@emeralt/database-inmemory'
import { EmeraltStorageInMemory } from '@emeralt/storage-inmemory'

export const createServer = async (users: TUser[] = []) =>
  createEmeraltServer({
    config: {
      logLevel: 'silent',
    },
    auth: EmeraltAuthInMemory({
      users: users.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.username]: cur.password,
        }),
        {},
      ),
    }),
    database: EmeraltDatabaseInMemory({}),
    storage: EmeraltStorageInMemory({}),
  }).then((s) => s.listen())
