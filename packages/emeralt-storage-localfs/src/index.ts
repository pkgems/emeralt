import { IEmeraltStorage } from '@emeralt/types'
import {
  pathExists,
  remove,
  createReadStream,
  mkdirp,
  createWriteStream,
} from 'fs-extra'
import { resolve } from 'path'

type Options = {
  path: string
}

export const EmeraltStorageLocalFS: IEmeraltStorage<Options> = ({
  path = 'node_modules/.data',
}) => () => {
  return {
    createReadStream: async (name, version) => {
      const file = resolve(path, name, version)

      if (await pathExists(file)) return createReadStream(file)
      else return undefined
    },

    createWriteStream: async (name, version) => {
      const dir = resolve(path, name)
      const file = resolve(dir, version)

      await mkdirp(dir)
      return createWriteStream(file)
    },

    dropData: () => {
      return remove(path)
    },

    healthz: async () => {
      try {
        await mkdirp(path)

        return { ok: true }
      } catch (error) {
        return {
          ok: false,
          message: error.message,
          error: error,
        }
      }
    },
  }
}
