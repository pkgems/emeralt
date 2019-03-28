import {
  IEmeraltDatabase,
  CEmeraltDatabase,
  TMetadata,
  TVersion,
} from '@emeralt/types'
import { DatastoreAdapter } from './adapter'
import { DatastoreOptions } from '@google-cloud/datastore'

interface Options extends DatastoreOptions {}

class CEmeraltDatabaseCloudDatastore implements CEmeraltDatabase {
  adapter: DatastoreAdapter

  constructor(options: Options) {
    this.adapter = new DatastoreAdapter(options)
  }

  getMetadatas() {
    return this.adapter.list(['metadatas']).then((d) =>
      d.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.name]: cur,
        }),
        {},
      ),
    )
  }

  hasMetadata(name: string) {
    return this.adapter.exists(['metadatas', name])
  }

  getMetadata(name: string) {
    return this.adapter.get(['metadatas', name])
  }

  putMetadata(name: string, metadata: TMetadata) {
    return this.adapter.set(['metadatas', name], metadata)
  }

  getVersions(name: string) {
    return this.adapter.list(['metadatas', name, 'versions']).then((d) =>
      d.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.version]: cur,
        }),
        {},
      ),
    )
  }

  hasVersion(name: string, version: string) {
    return this.adapter.exists(['metadatas', name, 'versions', version])
  }

  getVersion(name: string, version: string) {
    return this.adapter.get(['metadatas', name, 'versions', version])
  }

  putVersion(name: string, version: string, data: TVersion) {
    return this.adapter.set(['metadatas', name, 'versions', version], data)
  }

  async dropData() {
    await this.adapter.dropAll(['metadatas'])
    await this.adapter.dropAll(['versions'])
  }

  healthz() {
    return {
      ok: true,
    }
  }
}

export const EmeraltDatabaseCloudDatastore: IEmeraltDatabase<Options> = (
  options,
) => () => new CEmeraltDatabaseCloudDatastore(options)
