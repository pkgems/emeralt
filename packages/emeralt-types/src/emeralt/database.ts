import { OptionalPromise } from '../helpers'
import { TEmeraltServerConfig } from './server'
import { TMetadata, TVersion } from '../npm'
import { CEmeraltPlugin } from './plugin'

export interface CEmeraltDatabase extends CEmeraltPlugin {
  /** list existing packages */
  getMetadatas(): OptionalPromise<Record<string, TMetadata>>

  /** check if metadata exists */
  hasMetadata(name: string): OptionalPromise<boolean>

  /** get metadata of specific package */
  getMetadata(name: string): OptionalPromise<TMetadata>

  /** update metadata of specific package */
  putMetadata(name: string, data: TMetadata): OptionalPromise<any>

  /** list existing versions of specific package */
  getVersions(name: string): OptionalPromise<Record<string, TVersion>>

  /** check if version exists */
  hasVersion(name: string, version: string): OptionalPromise<boolean>

  /** get single version of specific package */
  getVersion(name: string, version: string): OptionalPromise<TVersion>

  /** update version of specific package */
  putVersion(
    name: string,
    version: string,
    data: TVersion,
  ): OptionalPromise<any>

  /** drop all data (used for test purposes) */
  dropData(): OptionalPromise<any>
}

export interface IEmeraltDatabase<C = {}> {
  (pluginConfig: C): (
    serverConfig: TEmeraltServerConfig,
  ) => OptionalPromise<CEmeraltDatabase>
}
