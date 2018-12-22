import { remove } from 'fs-extra'
import { getPackagePaths, getPackagesByPath } from '../utils'

export const clean = async (pkg: string | void) => {
  const pkgs = await getPackagesByPath(pkg, {
    includeCwd: true,
  })

  for (const pkg of pkgs) {
    const { output, cache, node_modules } = getPackagePaths(pkg)

    await Promise.all([
      remove(cache.root),
      remove(output.dir),
      remove(node_modules),
    ])
  }
}
