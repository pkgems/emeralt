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
  { minify = false, sourceMap = false, includeDependencies = false } = {},
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

    console.log('[build] building')
    const { code, map, assets } = await ncc(input, {
      cache: cache.ncc,
      externals,
      minify,
      sourceMap,
    })

    console.log('[build] saving')
    await fs.remove(output.dir)
    await fs.mkdirp(output.dir)

    if (code) {
      await fs.writeFile(output.code, code)
    }

    if (map) {
      await fs.writeFile(output.map, map)
    }

    if (assets) {
      for (const asset in assets) {
        const loc = asset
          .split('/')
          .splice(1)
          .join('/')

        await fs.mkdirp(join(output.dir, loc, '../'))
        await fs.writeFile(join(output.dir, loc), assets[asset])
      }
    }

    console.log('[build] done')
  }
}
