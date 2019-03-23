import { TEmeraltServerConfig } from './server'
import { CEmeraltDatabase } from './database'
import { CEmeraltPlugin } from './plugin'
import { OptionalPromise } from '../helpers'
import { Readable, Writable } from 'stream'

export interface CEmeraltStorage extends CEmeraltPlugin {
  /* get raw data */
  createReadStream(name: string, version: string): OptionalPromise<Readable>

  /* put raw data */
  createWriteStream(name: string, version: string): OptionalPromise<Writable>

  /** drop all data (used for test purposes) */
  dropData(): OptionalPromise<any>
}

export interface IEmeraltStorage<C = {}> {
  (pluginConfig: C): (
    serverConfig: TEmeraltServerConfig,
    database: CEmeraltDatabase,
  ) => OptionalPromise<CEmeraltStorage>
}
