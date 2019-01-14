import { OptionalPromise } from '../helpers'
import { TEmeraltServerConfig } from './server'
import { CEmeraltDatabase } from './database'
import { Readable } from 'stream'

export interface CEmeraltStorage {
  /* get raw data */
  getTarball(name: string, version: string): OptionalPromise<Readable>

  /* put raw data */
  putTarball(
    name: string,
    version: string,
    tarball: Buffer,
  ): OptionalPromise<any>
}

export interface IEmeraltStorage<C = {}> {
  (pluginConfig: C): (
    serverConfig: TEmeraltServerConfig,
    database: CEmeraltDatabase,
  ) => OptionalPromise<CEmeraltStorage>
}
