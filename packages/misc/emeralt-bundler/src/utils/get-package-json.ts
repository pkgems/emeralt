import { join } from 'path'
import { readFile } from 'fs-extra'

export const getPackageJson = async (cwd = process.cwd()) =>
  JSON.parse(await readFile(join(cwd, 'package.json'), 'utf8'))
