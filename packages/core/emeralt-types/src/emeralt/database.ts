import { OptionalPromise } from '../helpers'
import { TEmeraltServerConfig } from './server'
import { TMetadata, TVersion, TUser } from '../npm'

type Entities = {
  users: TUser
  metadata: TMetadata
  versions: TVersion
}

type Key = [keyof Entities, ...string[]]

export interface CEmeraltDatabase {
  /* list all keys on path */
  listKeys(path: Key): OptionalPromise<string[]>

  /* check if key exists */
  hasKey(path: Key): OptionalPromise<boolean>

  /* get data on path */
  getKey(path: Key): OptionalPromise<Entities[Key[0]]>

  /* overwrite/create data on path */
  setKey(path: Key, value: Entities[Key[0]]): OptionalPromise<boolean>

  /* create new data on path, return false if already exists */
  createKey(path: Key, value: Entities[Key[0]]): OptionalPromise<boolean>

  /* update data on path, return false if key does not exist */
  updateKey(path: Key, value: Entities[Key[0]]): OptionalPromise<boolean>

  /* delete key, return false if it does not exist */
  deleteKey(path: Key): OptionalPromise<boolean>
}

export interface IEmeraltDatabase<C = {}> {
  (pluginConfig: C): (
    serverConfig: TEmeraltServerConfig,
  ) => OptionalPromise<CEmeraltDatabase>
}
