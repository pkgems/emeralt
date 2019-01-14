import { OptionalPromise } from '../helpers'
import { TEmeraltServerConfig } from './server'
import { CEmeraltDatabase } from './database'

export interface CEmeraltAuth {
  createUser(username: string, password: string): OptionalPromise<boolean>

  deleteUser(username: string): OptionalPromise<boolean>

  comparePassword(username: string, password: string): OptionalPromise<boolean>

  canUser(
    username: string,
    action: 'publish' | 'get',
    packagename: string,
  ): OptionalPromise<boolean>
}
export interface IEmeraltAuth<C = {}> {
  (pluginConfig: C): (
    serverConfig: TEmeraltServerConfig,
    database: CEmeraltDatabase,
  ) => OptionalPromise<CEmeraltAuth>
}
