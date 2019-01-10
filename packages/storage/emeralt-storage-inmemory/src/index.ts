import { IEmeraltStorage } from '@emeralt/types'
import { path, assocPath } from 'ramda'
import { Readable } from 'stream'

export class EmeraltStorageInMemory implements IEmeraltStorage {
  private storage = {}

  async getTarball(name: string, version: string) {
    const buffer = path([name, version], this.storage)

    const rs = new Readable()
    rs.push(buffer)
    rs.push(null)

    return rs
  }

  async putTarball(name: string, version: string, tarball: Buffer) {
    this.storage = assocPath([name, version], tarball, this.storage)
  }
}
