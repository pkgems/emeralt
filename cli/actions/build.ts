import fs from 'fs-extra'
import ncc from '@zeit/ncc'
import { getPaths } from '../utils/get-paths'
import { getExternals } from '../utils/get-externals'

export const build = async ({ minify = false, sourceMap = false } = {}) => {
  const { input, output, cache } = getPaths()
  const externals = getExternals()

  console.log('[build] building')
  const { code, map, assets } = await ncc(input, {
    cache,
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
