import fs from 'fs-extra'
import ncc from '@zeit/ncc'
import dts from 'dts-generator'
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

    // TODO: emit declarations
    // await dts({
    //   name: require(join(pkg, 'package.json')).name,
    //   project: pkg,
    //   out: output.definitions,
    // })

    console.log('[build] done')
  }
}
