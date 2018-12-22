import { getPackagePaths } from './get-package-paths'
import { getPackages } from './get-packages'

export const getPackagesByPath = async (
  pkg: string | void,
  { includeCwd = false } = {},
) => {
  if (pkg) {
    if (pkg === '.') {
      return [process.cwd()]
    } else {
      // get referenced package path
      return [getPackagePaths(pkg).root]
    }
  } else {
    const packages = await getPackages()

    if (includeCwd) {
      return [...packages, process.cwd()]
    } else {
      return packages
    }
  }
}
