import { TUser, TEmeraltServerConfig } from '@emeralt/types'
import { createEmeraltServer } from '../../src/server'
import { EmeraltAuthInMemory } from '@emeralt/auth-inmemory'
import { EmeraltDatabaseInMemory } from '@emeralt/database-inmemory'
import { EmeraltStorageInMemory } from '@emeralt/storage-inmemory'

export const createServer = (
  config: TEmeraltServerConfig = {},
  users: TUser[] = [],
) =>
  createEmeraltServer({
    config: {
      logLevel: 'silent',
      ...config,
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
  }).then((s) =>
    s.listen(() => {
      // @ts-ignore
      s._setConfig('url', `http://localhost:${s.address().port}`)
    }),
  )
