import { TUser, TEmeraltServerConfig } from '@emeralt/types'
import deepmerge from 'deepmerge'

import { EmeraltAuthInMemory } from '@emeralt/auth-inmemory'
import { EmeraltDatabaseInMemory } from '@emeralt/database-inmemory'
import { EmeraltStorageInMemory } from '@emeralt/storage-inmemory'

import { createEmeraltServer } from '../../src'
import { emeraltServerDefaultConfig } from '../../src/config'

export const createTestServer = (
  config: TEmeraltServerConfig,
  users: TUser[],
) =>
  createEmeraltServer({
    config: deepmerge(emeraltServerDefaultConfig, config || {}),
    auth: EmeraltAuthInMemory({
      users: users.reduce(
        (acc, cur) => Object.assign({}, acc, { [cur.username]: cur.password }),
        {},
      ),
    }),
    database: EmeraltDatabaseInMemory({}),
    storage: EmeraltStorageInMemory({}),
  }).then((t) => t.listen())
