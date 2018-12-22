import glob from 'fast-glob'
import { getPackagesDir, getGitignore } from '.'
import { join } from 'path'

export const getPackages = async (): Promise<string[]> =>
  glob(join(getPackagesDir(), '*'), {
    ignore: await getGitignore(),
    onlyDirectories: true,
  })
