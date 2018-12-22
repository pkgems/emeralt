import { remove } from 'fs-extra'
import { getPackages, getPackagePaths } from '../utils'

export const clean = async (pkg: void | '.') => {
  const pkgs = pkg ? [process.cwd()] : [...(await getPackages()), process.cwd()]

  for (const pkg of pkgs) {
    const { output, cache, node_modules } = getPackagePaths(pkg)

    await Promise.all([
      remove(cache.root),
      remove(output.dir),
      remove(node_modules),
    ])
  }
}
