import ncc from '@zeit/ncc'
import fs from 'fs-extra'
import { basename, join } from 'path'
import {
  getPackagePaths,
  getExternals,
  getPackagesByPath,
  getCliConfig,
  sortPackagesByBuildOrder,
} from '../utils'

export const build = async (
  pkg: string | void,
  {
    minify = false,
    sourceMap = true,
    includeDependencies = false,
  } = {},
) => {
  const config = await getCliConfig()
  const pkgs = sortPackagesByBuildOrder(
    await getPackagesByPath(pkg),
    config.buildOrder,
  ).filter((p) => !config.exclude.includes(basename(p)))

  for (const pkg of pkgs) {
    console.log(`[build] ${basename(pkg)}`)
    const { input, output, cache } = getPackagePaths(pkg)
    const externals = includeDependencies ? [] : getExternals(pkg)

    try {
      console.log('[build] building')
      const { code, map, assets } = await ncc(input, {
        cache: cache.ncc,
        externals,
        minify,
        sourceMap,
      })

      console.log('[build] saving')

      // await fs.remove(output.dir)
      if (!(await fs.pathExists(output.dir))) {
        await fs.mkdirp(output.dir)
      }

      if (code) {
        await fs.writeFile(output.code, code)
      }

      if (map) {
        await fs.writeFile(output.map, map)
      }

      if (assets) {
        for (const asset in assets) {
          if (asset.split('/')[0] !== 'test') {
            const loc = asset
              .split('/')
              .splice(1)
              .join('/')

            const dir = join(output.dir, loc, '../')
            const file = join(output.dir, loc)

            if (!(await fs.pathExists(dir))) {
              await fs.mkdirp(dir)
            }
            await fs.writeFile(file, assets[asset])
          }
        }
      }

      console.log('[build] done')
    } catch (error) {
      console.error(error)
    }
  }
}
