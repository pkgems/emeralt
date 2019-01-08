import { IEmeraltDatabase } from '@emeralt/types'
import { path, assocPath } from 'ramda'

export class EmeraltDatabaseInMemory implements IEmeraltDatabase {
  private storage = {}

  getMetadata(name: string) {
    return path(['metadata', name], this.storage)
  }

  putMetadata(name: string, data: any) {
    this.storage = assocPath(['metadata', name], data, this.storage)
  }

  getVersion(name: string, version: string) {
    return path(['versions', name, version], this.storage)
  }

  putVersion(name: string, version: string, data: any) {
    this.storage = assocPath(['versions', name, version], data, this.storage)
  }
}
