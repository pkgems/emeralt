import mergeDeep from 'deepmerge'
import { pathExists, readFile } from 'fs-extra'
import { join } from 'path'

export type TConfig = {
  exclude: string[]
  buildOrder: string[]
  commands: {
    build: boolean
  }
}

const defaultConfig: TConfig = {
  exclude: [],
  buildOrder: [],
  commands: {
    build: false,
  },
}

export const getCliConfig = async (pkg = process.cwd()): Promise<TConfig> => {
  const configPath = join(pkg, 'cli.json')

  const config = (await pathExists(configPath))
    ? JSON.parse(await readFile(configPath, 'utf8'))
    : {}

  return mergeDeep(defaultConfig, config)
}
