import { readFile } from 'fs-extra'
import { join } from 'path'

export const readPackageJson = async (pkgDir) =>
  JSON.parse(await readFile(join(pkgDir, 'package.json'), 'utf8'))
