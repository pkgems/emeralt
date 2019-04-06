import { OptionalPromise } from '../helpers'
import { TEmeraltServerConfig } from './server'
import { CEmeraltDatabase } from './database'
import { CEmeraltPlugin } from './plugin'

export type TEmeraltAuthAction = 'publish' | 'get' | 'dropdata'

export type BaseUser = {
  username: string
  password: string
}

export interface CEmeraltAuth<User extends BaseUser = BaseUser>
  extends CEmeraltPlugin {
  putUser(user: User): OptionalPromise<any>

  hasUser(username: string): OptionalPromise<boolean>

  comparePassword(username: string, password: string): OptionalPromise<boolean>

  canUser(
    username: string,
    action: TEmeraltAuthAction,
    packagename?: string,
  ): OptionalPromise<boolean>
}

export interface IEmeraltAuth<Config = {}> {
  (pluginConfig: Config): (
    serverConfig: TEmeraltServerConfig,
    database: CEmeraltDatabase,
  ) => OptionalPromise<CEmeraltAuth>
}
