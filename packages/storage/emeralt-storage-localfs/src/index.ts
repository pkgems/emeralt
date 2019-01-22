import { IEmeraltStorage } from '@emeralt/types'
import fs, { pathExists } from 'fs-extra'
import { resolve } from 'path'

type Config = {
  path: string
}

export const EmeraltStorageLocalFS: IEmeraltStorage<Config> = (
  config,
) => () => {
  return {
    getTarball: async (name, version) => {
      const file = resolve(config.path, name, version)

      if (await pathExists(file)) return fs.createReadStream(file)
      else return undefined
    },

    putTarball: async (name, version, tarball) => {
      const dir = resolve(config.path, name)
      const file = resolve(dir, version)

      await fs.mkdirp(dir)
      await fs.writeFile(file, tarball)
    },
  }
}
