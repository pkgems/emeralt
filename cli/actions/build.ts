import fs from 'fs-extra'
import ncc from '@zeit/ncc'
import { basename } from 'path'
import { getPackagePaths, getExternals } from '../utils'

export const build = async ({
  minify = false,
  sourceMap = false,
  includeDependencies = false,
} = {}) => {
  console.log(`[build] ${basename(process.cwd())}`)
  const { input, output, cache } = getPackagePaths()
  const externals = includeDependencies ? [] : getExternals()

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

  console.log('[build] done')
}
