import { IEmeraltStorage, CEmeraltStorage } from '@emeralt/types'
import { join } from 'path'
import { Storage } from '@google-cloud/storage'

class CEmeraltStorageGCS implements CEmeraltStorage {
  constructor(private storage, private dir) {}

  public async getTarball(name, version) {
    const file = this.storage.file(join(this.dir, name, version))
    if (await file.exists()) {
      return file.createReadStream()
    } else {
      return undefined
    }
  }

  public async putTarball(name, version, tarball) {
    return new Promise(async (rs, rj) => {
      const file = this.storage.file(join(this.dir, name, version))

      const ws = file
        .createWriteStream()
        .on('finish', rs)
        .on('close', rs)
        .on('error', rj)

      ws.write(tarball, 'base64', () => {
        ws.end()
      })
    })
  }

  public async dropData() {}
}

type Options = {
  projectId: string
  keyFilename: string
  bucket: string
  dir: string
}

export const EmeraltStorageGCS: IEmeraltStorage<Options> = ({
  projectId,
  keyFilename,
  bucket,
  dir,
}) => async () => {
  const storage = new Storage({
    projectId,
    keyFilename,
  }).bucket(bucket)

  if (!(await storage.exists())) {
    await storage.create()
  }

  return new CEmeraltStorageGCS(storage, dir)
}
