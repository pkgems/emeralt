import { IEmeraltStorage, CEmeraltStorage } from '@emeralt/types'
import { join } from 'path'
import { Storage, StorageOptions, Bucket } from '@google-cloud/storage'
import { Readable } from 'stream'
import { WriteStream } from 'fs'

type Options = {
  storage: StorageOptions
  path: {
    bucket: string
    prefix?: string
  }
}

class CEmeraltStorageGCS implements CEmeraltStorage {
  private bucket: Bucket
  private prefix

  constructor({
    storage,
    path = {
      bucket: 'emeralt-test',
      prefix: '',
    },
  }: Options) {
    this.bucket = new Storage(storage).bucket(path.bucket)
    this.prefix = path.prefix
  }

  public async createReadStream(name, version) {
    const file = this.bucket.file(join(this.prefix, name, version))

    if (await file.exists()) {
      return file.createReadStream()
    } else {
      return undefined
    }
  }

  public async createWriteStream(name, version) {
    const file = this.bucket.file(join(this.prefix, name, version))

    return file.createWriteStream()
  }

  public async dropData() {
    await this.bucket.deleteFiles()
  }

  public async healthz() {
    try {
      const [ok] = await this.bucket.exists()

      return ok
        ? { ok: true }
        : { ok: false, message: 'GCS bucket does not exist!' }
    } catch (error) {
      return {
        ok: false,
        message: error.message,
        error: error,
      }
    }
  }
}

export const EmeraltStorageGCS: IEmeraltStorage<Options> = (options) => () =>
  new CEmeraltStorageGCS(options)
