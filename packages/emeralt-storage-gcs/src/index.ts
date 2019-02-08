import { IEmeraltStorage } from '@emeralt/types'
import { join } from 'path'
import { Storage } from '@google-cloud/storage'

type Config = {
  projectId: string
  keyFilename: string
  bucket: string
  dir: string
}

export const EmeraltStorageGCS: IEmeraltStorage<Config> = ({
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

  return {
    getTarball: async (name, version) => {
      const file = storage.file(join(dir, name, version))
      if (await file.exists()) {
        return file.createReadStream()
      } else {
        return undefined
      }
    },

    putTarball: (name, version, tarball) =>
      new Promise(async (rs, rj) => {
        const file = storage.file(join(dir, name, version))

        const ws = file
          .createWriteStream()
          .on('finish', rs)
          .on('close', rs)
          .on('error', rj)

        ws.write(tarball, 'base64', () => {
          ws.end()
        })
      }),
  }
}
