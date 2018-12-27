import { join } from 'path'

export const getExternals = (cwd = process.cwd()) => {
  const { dependencies, devDependencies } = require(join(
    cwd,
    'package.json',
  ))

  return Object.keys({
    ...dependencies,
    ...devDependencies,
  })
}
