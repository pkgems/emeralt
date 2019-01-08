import { IEmeraltStorage } from '@emeralt/types'
import { path, assocPath } from 'ramda'

export class EmeraltStorageInMemory implements IEmeraltStorage {
  private storage = {}

  getTarball(name: string, version: string) {
    return path([name, version], this.storage)
  }

  putTarball(name: string, version: string, tarball: string) {
    this.storage = assocPath([name, version], tarball, this.storage)
  }
}
