import { join } from 'path'
import { readFile } from 'fs-extra'

export const getExternals = async (cwd = process.cwd()) => {
  const { dependencies, devDependencies } = JSON.parse(
    await readFile(join(cwd, 'package.json'), 'utf8'),
  )

  return Object.keys({
    ...dependencies,
    ...devDependencies,
  })
}
